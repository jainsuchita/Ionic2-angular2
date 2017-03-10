import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

//The @Injectable() decorator is how Angular 2 declares it's services/providers. 
@Injectable()
export class GithubUsers {
  githubApiUrl = 'https://api.github.com';

  constructor(public http: Http) { }

  // Load all github users
  load(): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/users`)
      .map(res => <User[]>res.json());
  }
  
  // Get github user by providing login(username)
  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.githubApiUrl}/users/${login}`)
      .map(res => <User>(res.json()))
  }
  
  // Search for github users  
  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.githubApiUrl}/search/users?q=${searchParam}`) 
      .map(res => <User[]>(res.json().items))
  }
}

//We make a request to the github api, and parse the json response with res.json(), 
//which we then cast as an array of users with <User[]>res.json(). 
//This is returned as an observable, which we'll subscribe to to see the users.
