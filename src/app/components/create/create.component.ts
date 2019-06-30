import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  editorConfig: any ;
  title: string;
  content: string;
  user: any = {};
// tslint:disable-next-line: no-output-rename
  @Output('postCreated') postCreated = new EventEmitter();

  constructor() {

    this.user = firebase.auth().currentUser;
    this.editorConfig = {
      "editable": true,
      "spellcheck": true,
      "height": "auto",
      "minHeight": "0",
      "width": "auto",
      "minWidth": "0",
      "translate": "yes",
      "enableToolbar": true,
      "showToolbar": false,
      "placeholder": "Enter text here...",
      "imageEndPoint": "",
      "toolbar": [
          ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
          ["fontName", "fontSize", "color"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
          ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
          ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
          ["link", "unlink", "image", "video"]
      ]
  };
  }

  ngOnInit() {
    console.log(this.user);
  }

  createPost() {
    firebase.firestore().collection('post').add({
      title: this.title,
      content: this.content,
      owner: this.user.uid,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then( (data) => {
      console.log(data);
      this.postCreated.emit();
    } ).catch((error) => {
      console.log(error);
    })
    }
  }

