import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: any = {};
  message: string = '';
  constructor() {
    this.getProfile();
  }

  ngOnInit() {
  }

  getProfile(){
    let userId = firebase.auth().currentUser.uid;

    firebase.firestore().collection('users').doc(userId).get().then( (documentSnapshot) => {
      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + ' ' + this.user.lastName;
      this.user.id = documentSnapshot.id;
      console.log(this.user);
    }).catch( (error) => {
      console.log(error);
    });
  }

  update() {
    this.message = 'Updating Profile';

    firebase.auth().currentUser.updateProfile({
      displayName: this.user.displayName , photoURL: this.user.photoURL
    }).then( () => {

      let userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection('users').doc(userId).update({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        hobbies: this.user.hobbies,
        interests: this.user.interests,
        bio: this.user.bio
      }).then( () => {
        this.message = 'Profile Updated Sucessfully ';
      } ).catch( (error) => {
        console.log(error);
      });
    });
  }
}
