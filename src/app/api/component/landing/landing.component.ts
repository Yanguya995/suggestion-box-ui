import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { LoginService } from '../login/login.service';
import { User } from '../../../models/user';
import { Post } from '../../../models/Post';
import { Avatar } from "../../../models/Avatar";
import { Chat } from "../../../models/Chat";
import { Router } from '@angular/router';
import { map } from 'rxjs/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { log } from 'util';
import { element } from 'protractor';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isPostsNull: boolean = false;
  token: String = window.localStorage.getItem('token');
  id: String = window.localStorage.getItem('id');
  message: String = "";
  post: Post;
  chat: Chat;
  avatar: Avatar;
  listOfChats: Chat[];
  listOfAvatars: Avatar[];
  currentAvatar: Avatar;

  constructor(private http: Http, private loginService: LoginService, private router: Router) { }
  loggedInUser: User;
  headers: Headers = new Headers({ 'content-type': 'application/json', 'authorization': this.token });
  ngOnInit() {
    if (this.loginService.isUserLoggedin()) {
      this.getData();
      this.getChats();
      this.getAvatars();
      console.log(this.listOfAvatars);
      console.log(this.listOfChats);
    } else {
      this.router.navigate(['']);
    }
  }

  createNewChat() {
    this.chat = new Chat("This is another title", this.message, null, this.avatar);
    this.http.options('http://localhost:3000/chats/', {
      method: 'POST',
      body: this.chat,
      headers: this.headers
    })
      .map(res => res.json())
      .subscribe(data => console.log(data));
  }

  sendPost() {
    if (this.currentAvatar == null) {
      alert('No Data');
    } else {
      alert('Have Data')
    }

  }
  getData() {
    this.loggedInUser = new User();
    this.http.options('http://localhost:3000/users/' + this.id, {
      method: 'GET',
      headers: this.headers
    }).map(res => res.json())
      .subscribe(data => {
        this.loggedInUser = {
          id: data._id, name: data.name,
          password: data.password, email: data.email, date_of_birth: data.date_of_birth,
          occupation: data.occupation, gender: data.gender
        }; console.log(this.loggedInUser);
      });
  }
  getProfile() {
    this.router.navigate(['/profile']);
  }

  createNewAvatar() {
    this.avatar = new Avatar(null, "Mmela", this.id);
    this.http.options('http://localhost:3000/avatars/', {
      method: 'POST',
      body: this.avatar,
      headers: this.headers
    })
  }
  getAvatars() {
    this.currentAvatar = null;
    this.listOfAvatars = [];
    this.http.options('http://localhost:3000/avatars/' + this.id, {
      method: 'GET',
      headers: this.headers
    })
      .map(res => res.json())
      .subscribe(data => {
        data.forEach(element => {
          this.listOfAvatars.push(element);
          this.currentAvatar = new Avatar(element._id, element.name, element.user);
        });
      });
  }
  getChats() {
    this.listOfChats = [];
    this.http.options('http://localhost:3000/chats/', {
      method: 'GET',
      headers: this.headers
    }).map(res => res.json())
      .subscribe(data => {
        data.forEach(element => {
          this.listOfChats.push(element);
        });
      })
  }

  logout() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('id');
    this.router.navigate(['']);
  }
}