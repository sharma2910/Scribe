import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comment: string = '';
  comments: any[] = [];
  loggedIn: boolean = false;

// tslint:disable-next-line: no-input-rename
  @Input("postId") postId: string;

  constructor() {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    } );
   }

  ngOnInit() {
    this.getComments();
  }

  postComment() {
    if (this.comment.length < 5) {
      return;
    }

    firebase.firestore().collection('comments').add({
      text: this.comment,
      post: this.postId,
      owner: firebase.auth().currentUser.uid,
      ownerName: firebase.auth().currentUser.displayName,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then( (data) => {
      this.getComments();
      console.log('comment Posted');
    } ).catch( (error) => {
      console.log(error);
    })
  }

  getComments() {
    this.comments = [];
    firebase.firestore().collection('comments').where('post', '==' , this.postId).orderBy("created",'desc').get().
    then( (data) => {
      data.docs.forEach( ( commentsRef) => {
        this.comments.push(commentsRef.data() );
      });
    });
  }
}
