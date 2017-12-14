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
import * as moment from 'moment';
import { DatePipe } from '@angular/common/src/pipes';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  isPostsNull: boolean = false;
  token: String = window.localStorage.getItem('token');
  id: String = window.localStorage.getItem('id');
  postBody = {
    chatId: "",
    body: ""
  }
  chatBody: String = "";
  chatTitle: String = "";
  post: Post;
  chat: Chat;
  avatar: Avatar;
  listOfChats: Chat[];
  listOfAvatars: Avatar[];
  currentAvatar: Avatar;
  changedChat: String;
  message: String = "";
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
    this.chat = new Chat(null, this.chatTitle, this.chatBody, null, this.currentAvatar.id);
    this.http.options('http://localhost:3000/chats', {
      method: 'POST',
      body: this.chat,
      headers: this.headers
    })
      .map(res => res.json())
      .subscribe(data => console.log(data));
  }

  postMessageChanged($event, chatId: any) {
    this.postBody.chatId = chatId;
    this.postBody.body = $event;
  }

  sendPost(chatId: String) {
    if (this.postBody.chatId === chatId) {
      this.post = new Post(this.postBody.chatId, this.currentAvatar.id, this.postBody.body);
      this.http.options('http://localhost:3000/posts', {
        method: 'POST',
        body: this.post,
        headers: this.headers
      })
        .map(res => res.json())
        .subscribe(data => console.log(data));
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
          console.log(element);
          if (element.post !== null && element.post.length > 0) {
            for (var i = 0; i < element.post.length; i++) {
              element.post[i].createdDate = moment(element.post[i].createdDate).fromNow();
            }
          }
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