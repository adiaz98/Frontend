import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import { SignupInfo } from '../auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  genders = [
    "Hombre",
    "Mujer"
  ]

  constructor(private authService: AuthService) { }
  finalRole = ['admin'];
  isPatient = false;

  setRegistrationType(event: Event) {
    // tslint:disable-next-line:triple-equals
    if ((event.target as HTMLInputElement).value == 'doctor') {
      this.isPatient = false;
      this.finalRole = ['admin'];
    } else {
      this.isPatient = true;
      this.finalRole = ['user'];
    }
  }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);
    // tslint:disable-next-line:max-line-length
    this.signupInfo = new SignupInfo(this.form.username, this.finalRole, this.form.password, this.form.firstname, this.form.lastname, this.form.email, this.form.telephone, this.form.gender);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
