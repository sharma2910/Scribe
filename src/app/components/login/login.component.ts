import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    myForm: FormGroup;
    message: string = "";
    userError: any ;
  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required] ],
      password: ['', [ Validators.required, Validators.minLength(8) ]]
    } );
   }

  ngOnInit() {
  }

  onSubmit(form)  {

    this.authService.login( form.value.email, form.value.password ).
      then( (data) => {
        console.log(data);
        console.log("logged In")
        this.message = "You have Logged In sucessfully ";
      }).catch((error) => {
        this.userError = error ;
      });
  }

}
