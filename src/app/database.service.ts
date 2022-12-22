import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(map(res=>{
        const users = [];
        for(let key in res){
          // @ts-ignore
          users.push({...res[key], userId:key});
        }
        return users;
      }));
  }

  getPosts(){
    return this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(map(res => {
        const posts = [];
        for (let key in res) {
          // @ts-ignore
          posts.push({...res[key], postId:key});
        }
        return posts;
      }));
  }
}
