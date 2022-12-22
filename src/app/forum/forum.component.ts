import { Component } from '@angular/core';
import {DatabaseService} from "../database.service";
import {Post} from "../post.model";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  users : any[] = [];
  posts : any[] = [];

  commentEditorActive = false;
  currentComment = new Post();
  mode = '';

  constructor(private databaseService : DatabaseService){}

  ngOnInit(){
    //Get users
    this.databaseService.getUsers()
      .subscribe(res=> this.users = res);
    //Get posts
    // this.databaseService.getPosts()
    //   .subscribe(res=>this.posts=res);
    this.databaseService.getPosts()
      .subscribe(res=> {
        this.posts = res;
        console.log(res);
      });
  }

  finishEditing() {
    this.commentEditorActive = false;
    this.databaseService.getPosts()
      .subscribe(res=>this.posts=res);
  }

  edit(i: number) {
    this.currentComment = this.posts[i];
    this.commentEditorActive = true;
    this.mode = 'edit';
  }

  delete(i:number){
    this.databaseService.deleteComment(this.posts[i].postId)
      .subscribe(()=>{
        this.databaseService.getPosts()
          .subscribe(res=>this.posts=res);
      });
  }

  newComment() {
    this.commentEditorActive = true;
    this.mode = 'new';
  }
}

