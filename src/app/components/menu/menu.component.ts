import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  loggedIn = false;
  user: any;
  constructor(public router: Router) {
    this.user = firebase.auth().currentUser;

    if (this.user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false ;
    }
    firebase.auth().onAuthStateChanged( (user) => {
      this.user = user;
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false ;
      }
    });
  }

  ngOnInit() {
  }

  loginClicked() {
    let user = firebase.auth().currentUser;

    if(user){
      this.router.navigate(['/myblogs']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
