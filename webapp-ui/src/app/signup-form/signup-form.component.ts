import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { UsernameValidators } from '../common/validators/username.validators';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  // Remember that, the async validator is third validator
  form = new FormGroup({
    account : new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ], UsernameValidators.shouldBeUnique),
      password: new FormControl('', Validators.required)
    })
    
  })

  get username() {
    return this.form.get('account.username')
  }

  login() {
    // let isValid = authService.login(this.form.value)
    // if (!isValid) {
     
    // }
    this.form.setErrors({
      isValidLogin: true
    })
  }
}
