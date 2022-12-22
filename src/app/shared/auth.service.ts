import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {DatabaseService} from "./database.service";
import {User} from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user : User | undefined;

  constructor(private http : HttpClient, private router: Router, private databaseService : DatabaseService) { }

  login(credentials : {username: string, password: string}){
    this.databaseService.getUsers()
      .subscribe(res => {
        let authSuccess = false;
        for(let user of res){
          if(user.username == credentials.username && user.password == credentials.password){
            localStorage.setItem('user',JSON.stringify(user));
            this.user = user;
            this.router.navigate(['/']);
          }
        }
      });
  }

  getUser(){
    let u = localStorage.getItem('user');
    if(!this.user && u) this.user = JSON.parse(u);
    return {...this.user} as User;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(){
    return this.user != null;
  }
}
