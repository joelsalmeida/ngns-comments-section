import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CommentsService, TComment } from '../../services/comment.service';
import { CommentComponent } from '../comment/comment.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, PostCommentComponent],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.sass'
})
export class CommentsSectionComponent {
  constructor(private commentsService: CommentsService, private authService: AuthService) { }

  comments$!: Observable<TComment[]>;
  authenticatedUser = this.authService.authenticatedUser;

  ngOnInit(): void {
    this.comments$ = this.commentsService.comments;
    console.log(' CommentsSectionComponent comments:', this.comments$);
  }
}
