import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  registrationFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // this.passwordFormGroup = this.formBuilder.group({
    //   password: ['', Validators.required],
    //   repeatPassword: ['', Validators.required]
    // }, {
    //   validator: RegistrationValidator.validate.bind(this)
    // });
    this.registrationFormGroup = this.formBuilder.group({
      email: ['', Validators.required, EmailValidator]
      // passwordFormGroup: this.passwordFormGroup
    });
   }

  ngOnInit() {
  }

  sendEmail() {
    // Send forgotten password email
  }

}
