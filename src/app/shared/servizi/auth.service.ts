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
import { autologout } from 'src/app/views/auth/state/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  userData: any;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
  });

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private route: ActivatedRoute,
    public store: Store<AppState>,
    private http: HttpClient
  ) {}
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

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    setTimeout(() => {
      this.store.dispatch(autologout());
    }, timeInterval);
  }
  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  // Disconnessione
  SignOut(event: Event) {
    event.preventDefault();
    this.store.dispatch(autologout());
  }

  logoutS() {
    localStorage.removeItem('userData');
    this.afAuth.signOut();
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

  //DA SISTEMAE CON NGRX

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
      this.router.navigate(['/']);
    });
  }

  // Logica di autenticazione per eseguire provider di autenticazione
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/']);
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
}
