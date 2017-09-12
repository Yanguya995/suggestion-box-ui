import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.loginService.isUserLoggedin()) {
      this.getUserChatData();
    } else {
      this.router.navigate(['']);
    }
  }

  getUserChatData() {

  }
}
