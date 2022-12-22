import { Component } from '@angular/core';
import {DatabaseService} from "../shared/database.service";
import {Post} from "../post.model";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {User} from "../user.model";

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

  user !: User;

  isAuthenticated !: boolean;

  constructor(private databaseService : DatabaseService, private auth : AuthService, private router: Router){}

  ngOnInit(){
    this.user = this.auth.getUser();
    if(!this.auth.isAuthenticated()) this.router.navigate(['/login']);
    //Get users
    this.databaseService.getUsers()
      .subscribe(res=> this.users = res);
    //Get posts
    this.databaseService.getPosts()
      .subscribe(res=>this.posts=res);
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

  logout() {
    console.log(this.user);
    this.auth.logout();
  }
}

