import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  constructor(private http: Http) { }
  token = window.localStorage.getItem('token');

 isUserValid(data) {
   debugger;
   const headers = new Headers ({'content-type': 'application/json'});
   const options = new RequestOptions({
     headers: headers,
     body: data
      });

  return this.http.post('http://localhost:3000/login', options.body)
  .map(res => res.json());
}
isUserLoggedin() {
  if (this.token) {
    return true;
  }else {
    return false;
  }
}
}
