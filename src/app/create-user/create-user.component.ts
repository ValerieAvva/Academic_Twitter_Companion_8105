import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  hide = true;

  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
 
  constructor(private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, {
      validator: RegistrationValidator.validate.bind(this)
    });
    this.registrationFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
   }

  ngOnInit() {
  }

  createUser() {
    // TODO: Fill in
  }

}

export class RegistrationValidator {
  static validate(registrationFormGroup: FormGroup) {
      let password = registrationFormGroup.controls.password.value;
      let repeatPassword = registrationFormGroup.controls.repeatPassword.value;

      if (repeatPassword.length <= 0) {
          return null;
      }

      if (repeatPassword !== password) {
          return {
              doesMatchPassword: true
          };
      }

      return null;

  }
}
