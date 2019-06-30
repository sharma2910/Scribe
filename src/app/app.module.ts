import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import 'firebase/auth';
import {NgxEditorModule} from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { MyBlogsComponent } from './components/my-blogs/my-blogs.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { PostComponent } from './components/post/post.component';
import { ViewComponent } from './components/view/view.component';
import { CommentsComponent } from './components/comments/comments.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';


firebase.initializeApp({
  apiKey: 'AIzaSyCsWFxaYPme5WYp9ifBuf6Nn_HoNa9gOyc',
  authDomain: 'scribe-8524c.firebaseapp.com',
  databaseURL: 'https://scribe-8524c.firebaseio.com',
  projectId: 'scribe-8524c',
  storageBucket: '',
  messagingSenderId: '960737553618',
  appId: '1:960737553618:web:19a4d975355695d3'
} );

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    SignUpComponent,
    MyBlogsComponent,
    HomeComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditProfileComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
