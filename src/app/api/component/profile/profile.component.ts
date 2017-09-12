import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../login/login.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: Http, private loginService: LoginService) { }

  ngOnInit() {
    if (this.loginService.isUserLoggedin()) {
      this.getData();
    }
  }


  getData() {
    return this.http.get('http://localhost:3000/users')
    .map(res => res.json())
    .subscribe(data => console.log(data));
  }
}
