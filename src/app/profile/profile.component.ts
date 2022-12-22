import { Component } from '@angular/core';
import {User} from "../user.model";
import {AuthService} from "../shared/auth.service";
import {DatabaseService} from "../shared/database.service";
import {ByUserPipe} from '../by-user.pipe';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user !: User;
  userId !: string;
  posts : any[] = [];


  constructor(private databaseService : DatabaseService, private auth : AuthService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(){
    const byUserPipe = new ByUserPipe();
    this.user = this.auth.getUser();
    this.databaseService.getPosts()
      .subscribe(res => {
        this.posts = byUserPipe.transform(res, this.userId);
        console.log(this.posts);
      });
  }
}
