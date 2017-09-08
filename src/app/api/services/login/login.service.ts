import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get('http://localhost:3000/users')
    .map(res => res.json());
  }
}
