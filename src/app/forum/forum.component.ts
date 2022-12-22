import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {count, map} from "rxjs";
import {DatabaseService} from "../database.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  users : any;
  posts : any;

  constructor(private http: HttpClient, private databaseService : DatabaseService){}

  ngOnInit(){
    //Get users
    // this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/users.json')
    //   .pipe(map(res=>{
    //     const users = [];
    //     for(let key in res){
    //       // @ts-ignore
    //       users.push({...res[key], userId:key});
    //     }
    //     return users;
    //   }))
    //   .subscribe(res => {
    //     this.users = res;
    //   });
    //Get users
    this.databaseService.getUsers()
      .subscribe(res=> {
        console.log(res);
        this.users = res
      });
    //Get
    // this.http.get('https://lab5-90585-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    //   .pipe(map(res => {
    //     const posts = [];
    //     for (let key in res) {
    //       // @ts-ignore
    //       posts.push({...res[key], postId:key});
    //     }
    //     return posts;
    //   }))
    //   .subscribe(res => {
    //     this.posts = res;
    //   });
    //Get posts
    this.databaseService.getPosts()
      .subscribe(res=>this.posts=res);
  }

  deleteComment(index:number){
    this.posts.splice(index, 1);
  }

  editComment(index:number){

  }
}

