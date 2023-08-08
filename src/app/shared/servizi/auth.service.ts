import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { AuthResponseData } from '../models/AuthResponseData';
import { User } from '../models/user.model';
import { User2 } from './user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/views/auth/state/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  returnUrl: string;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
  });
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private route: ActivatedRoute,
    public store: Store<AppState>,
    private http: HttpClient
  ) {
    /* Salvataggio dei dati utente in localstorage quando
    effettuato l'accesso e l'impostazione di null quando si è disconnessi */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        // this.store.dispatch(loginSuccess({ user }));
        // console.log(user)
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // Accedi con e-mail/password
  SignIn(email: string, password: string): Observable<AuthResponseData> {
    // this.SetUserData(user);
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email non trovata';
      case 'INVALID_PASSWORD':
        return 'Password non valida';
      default:
        return 'Errore sconosciuto, perfavore riprova';
    }
  }

  checkAuth() {
    return this.afAuth.authState;
  }

  // Registrazione con email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Chiama la funzione SendVerificaitonMail()  quando un nuovo utente si registra
        su e restituisce la promessa */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.Toast.fire(error.message, '', 'error');
      });
  }

  // Invia e-mail di verifica quando un nuovo utente si registra
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reimposta password dimenticata
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Mail reset password inviato, controlla la tua posta.');
      })
      .catch((error) => {
        this.Toast.fire(error, '', 'error');
      });
  }

  // Restituisce vero quando l'utente ha effettuato l'accesso e l'e-mail è stata verificata
  // get isLoggedIn(): boolean {
  //   // const user = JSON.parse(localStorage.getItem('user')!);
  //   const user = this.store.select(isAuthenticated);
  //   return user != null ? false : true;
  // }

  // Accedi con Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate([this.returnUrl]);
    });
  }

  // Logica di autenticazione per eseguire provider di autenticazione
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate([this.returnUrl]);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this.Toast.fire(error, '', 'error');
      });
  }
  /* Impostazione dei dati utente quando si accede con nome utente/password,
  registrati con username/password e accedi con social auth
  provider nel database Firestore utilizzando il servizio AngularFirestore + AngularFirestoreDocument */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User2 = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Disconnessione
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth/login']);
      // this.Toast.fire("Sei uscito con successo dall'account", 'info');
    });
  }
}
