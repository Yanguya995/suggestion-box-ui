import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  username: String;
  password: String;

  body = {
    username: this.username,
    password: this.password
  };

  ngOnInit() {

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
          this.router.navigate(['/chat']);
         }else {
          console.log(data);
        }
      } ,
      err => console.log(err),
      () => console.log('request complete'));
  }
}
