import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

// tslint:disable-next-line: no-input-rename
  @Input('post') post: any ;
// tslint:disable-next-line: no-output-rename
  @Output('onDelete') onDelete = new EventEmitter();

  postData: any = {};
  user: any = {};

  constructor() { }

  ngOnInit() {
    this.postData = this.post.data();
    this.user = firebase.auth().currentUser;
  }

  delete() {
    firebase.firestore().collection('post').doc(this.post.id).delete().then( () => {
      this.onDelete.emit();
    });
  }
}
