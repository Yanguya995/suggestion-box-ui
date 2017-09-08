import { Component, OnInit, Injectable } from '@angular/core';
import { User } from './models/user';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  users: User[];
  user: User;

  constructor() {

  }

  ngOnInit() {
  }
}
