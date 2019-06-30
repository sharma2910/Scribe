import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string , password: string) {
    return firebase.auth().signInWithEmailAndPassword( email, password );
  }

  signUp(firstName: string , lastName: string, email: string, password: string) {
    return new Promise(( resolve , reject ) => {
      firebase.auth().createUserWithEmailAndPassword(email, password ).then(
        (response) => {
          const random = Math.floor(Math.random() * 1000 );
          response.user.updateProfile({
            displayName : firstName + ' ' + lastName,
            photoURL: 'https://api.adorable.io/avatars/' + random
          }).then(() => {
            resolve(response.user);
          }).catch((error) => {
            reject(error);
          });
        }
      ).catch( (error) => {
        reject(error);
      } );
    });
  }

  constructor() { }
}
