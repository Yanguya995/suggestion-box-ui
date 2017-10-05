import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: '../register/register.component.html',
  styleUrls: ['../register/register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor() {}
  newuser: User = new User();
  months = [
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'October' },
    { name: 'November' },
    { name: 'December' }
  ];

  selectedDay: number;
  selectedMonths: string;
  selectedYear: number;
  registerForm: FormGroup;
  days: number[] = [];
  years: number[] = [];

  ngOnInit() {
    this.populateDays();
    this.populateYears();
    this.validateForm();
    this.newuser = new User();
  }

  populateDays() {
    this.days = [];
    for (let index = 1; index <= 31; index++) {
      this.days.push(index);
    }
  }

  populateYears() {
    this.years = [];
    for (let index = 2017; index >= 1939; index--) {
      this.years.push(index);
    }
  }

  validateForm() {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      'name': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/i)]),
      'pass': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/i)]),
      'cpass': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/i)]),
      'occupation': new FormControl('', [Validators.required, this.passwordsAreTheSame('pass'), Validators.pattern(/^[a-zA-Z]+$/i)]),
      'gender': new FormControl('', [Validators.required, this.forbiddenValueValidator(/--Select Gender--/i)]),
      'year': new FormControl('', [Validators.required, this.forbiddenValueValidator(/--Year--/i)]),
      'month': new FormControl('', [Validators.required, this.forbiddenValueValidator(/--Month--/i)]),
      'day': new FormControl('', [Validators.required, this.forbiddenValueValidator(/--Day--/i)])
    });
  }

  forbiddenValueValidator(value: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = value.test(control.value);
      return forbidden ? { 'forbidden': { value: control.value } } : null;
    };
  }

  passwordsAreTheSame(value: string): ValidatorFn {
    return null;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) { }
  loginForm: FormGroup;
  username: String;
  password: String;
  body = {
    username: this.username,
    password: this.password
  };

  ngOnInit() {
    this.validateForm();
  }

  validateForm() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/i)])
    });
  }

  forbiddenValueValidator(value: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const forbidden = value.test(control.value);
      return forbidden ? { 'forbidden': { value: control.value } } : null;
    };
  }

  authenticate() {
    debugger;
    this.body.username = this.username;
    this.body.password = this.password;
    this.loginService.isUserValid(this.body)
      .subscribe(
      data => {
        if (data.token) {
          window.localStorage.setItem('token', data.token);
          window.localStorage.setItem('id', data.user);
          debugger;
          this.router.navigate(['/profile']);
        } else {
          this.router.navigate(['']);
        }
      },
      err => console.log(err),
      () => console.log('request complete'));
  }
}
