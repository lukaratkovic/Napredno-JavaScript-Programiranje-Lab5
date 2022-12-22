import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../database.service";

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent {
  @Input() comment : any;
  @Input() mode !: string;
  @Output() onPost : EventEmitter<void> = new EventEmitter<void>();

  commentForm !: FormGroup;

  constructor(private fb: FormBuilder, private databaseService : DatabaseService) {

  }

  ngOnInit() : void {
    this.commentForm = this.fb.group({
      'comment': new FormControl(this.mode == 'edit' ? this.comment.comment : '', Validators.required)
    });
  }

  onSubmit() {
    if(this.mode == 'new'){
      let comment = {
        //TODO: Replace hardcoded userId with current userId
        userId: '-NJum9u3i1-KyALG8y-9',
        timestamp: new Date(),
        comment: this.commentForm.value.comment
      };
      this.databaseService.addComment(comment)
        .subscribe(()=>this.onPost.emit());
    }
    else if(this.mode == 'edit'){
      let id = this.comment.postId;
      this.comment.comment = this.commentForm.value.comment;
      this.databaseService.editComment(this.comment.postId, this.comment)
        .subscribe(()=>this.onPost.emit());
    }
  }
}
