import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  newUser = {username: '', password: '', repeatPassword: '', name: '', mail: ''};
  registerForm : FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder){
    this.registerForm = this.fb.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'password': new FormControl('', Validators.required),
      'repeatPassword': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'mail': new FormControl('', [Validators.required, Validators.email])
    });
  }

  onSubmit() {
    console.log(this.newUser);
    this.http.post('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/users.json', this.newUser)
      //Navigate back to log in on register
      .subscribe(() => this.router.navigateByUrl('/login'));
  }
}
