import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab5';
  users : any;
  posts : any;

  constructor(private http: HttpClient){}

  ngOnInit(){
    //Get users
    this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/users.json')
      .pipe(map(res=>{
        const users = [];
        for(let key in res){
          // @ts-ignore
          users.push({...res[key], userId:key});
        }
        return users;
      }))
      .subscribe(res => {
        this.users = res;
      });
    //Get posts
    this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(map(res => {
        const posts = [];
        for (let key in res) {
          // @ts-ignore
          posts.push({...res[key], postId:key});
        }
        return posts;
      }))
      .subscribe(res => {
        this.posts = res;
      });
  }
}
