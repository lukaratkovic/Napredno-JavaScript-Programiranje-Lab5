import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Post} from "../post.model";

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

  addUser(newUser : object){
    return this.http.post('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/users.json', newUser);
  }

  addComment(comment : object){
    return this.http.post('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts.json', comment);
  }

  deleteComment(id : string){
    return this.http.delete(`https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`);
  }

  editComment(id: string, comment: {comment: string, timestamp: Date, userId: string, postId?: string, username?: string}) {
    delete comment['postId'];
    delete comment['username'];
    return this.http.patch(`https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts/${id}.json`, comment);
  }
}
