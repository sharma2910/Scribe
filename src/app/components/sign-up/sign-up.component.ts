import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup , FormBuilder , Validators } from '@angular/forms';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  matchingPassword: boolean ;
  myForm: FormGroup;
  message: string = "";
  userError: any ;
  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.myForm = this.fb.group({
      firstName: ['' , [ Validators.required ] ],
      lastName: ['' , [ Validators.required ]],
      email: ['' , [ Validators.required ]],
      password: ['', [ Validators.required , Validators.minLength(8) ]],
      confirmPassword: ['', [Validators.required ]]
    },
    {
      validators: this.checkIfMatchingPasswords('password', 'confirmPassword')
    } );
   }

   checkIfMatchingPasswords(passwordKey: string , confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value === confirmPassword.value) {
        this.matchingPassword = true ;
        return;
      } else {
        confirmPassword.setErrors({
          notEqualToPassword: true
        });
      }
    };
   }
  ngOnInit() {
  }
  onSubmit(form) {
    let firstName = form.value.firstName ;
    let lastName = form.value.lastName ;
    let email = form.value.email;
    let password = form.value.password ;

    this.authService.signUp( firstName, lastName, email, password ).then( (user: any) => {

      firebase.firestore().collection('users').doc(user.uid).set({
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        photoURL: user.photoURL,
        interests: '',
        bio: '',
        hobbies: ''
      }).then( () => {
        this.message = 'You Have Logged In Sucessfully ';
      });
      }).catch( (error) => {
        this.userError = error;
      });

  }
}
