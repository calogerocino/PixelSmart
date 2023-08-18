import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../models/user.interface';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly afs: AngularFirestore,
    private readonly authService: AuthService
  ) {}

  /* Impostazione dei dati utente quando si accede con nome utente/password,
  registrati con username/password e accedi con social auth
  provider nel database Firestore utilizzando il servizio AngularFirestore + AngularFirestoreDocument */
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.localId}`
    );
    const userData: User = {
      email: user.email,
      token: user.token,
      localId: user.localId,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  GetUserDataFireBase(): Observable<User> {
    const usersDocuments = this.afs.doc<User>(
      `users/${this.authService.getUserFromLocalStorage().localId}`
    );
    return usersDocuments.snapshotChanges().pipe(
      map((changes) => {
        const data = changes.payload.data();
        const id = changes.payload.id;
        return { id, ...data };
      })
    );
  }

  getFFList() {
    return this.afs.collection('users').snapshotChanges();
  }

  getFFUser(uid: string) {
    return new Promise<any>((resolve) => {
      this.afs
        .collection('users', (ref) => ref.where('localiId', '==', uid))
        .valueChanges()
        .subscribe((users) => resolve(users));
    });
  }
}
