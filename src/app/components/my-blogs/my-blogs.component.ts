import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  posts: any[] = [];
  user: any = {};
  constructor() {
    this.user = firebase.auth().currentUser;
    this.getPost();
   }

  ngOnInit() {
  }

  getPost() {
    firebase.firestore().collection('post')
    .orderBy('created', 'desc')
    .get().then( (querySnapshot) => {
      console.log(querySnapshot.docs);
      this.posts = querySnapshot.docs;
    })
  }

  onPostCreated() {
    console.log('onpostCreated called');
    this.posts = [];
    this.getPost();
  }

  onDelete() {
    this.posts = [];
    this.getPost();
  }
}
