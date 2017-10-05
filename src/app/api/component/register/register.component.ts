import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor() {}
  newuser: User = new User();
  months = [
    { name: 'January'},
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
      'occupation': new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/i)]),
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

  addNewUser() {
    this.newuser.email = this.registerForm.get('email').value;
    this.newuser.name = this.registerForm.get('name').value;
    this.newuser.password = this.registerForm.get('pass').value;
    this.newuser.occupation = this.registerForm.get('occupation').value;
    this.newuser.gender = this.registerForm.get('gender').value;
    this.newuser.dob = this.registerForm.get('year').value + '-' + this.registerForm.get('month').value + '-' +
     this.registerForm.get('day').value;
    alert(JSON.stringify(this.newuser));
  }
}
