import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentsService, TComment } from '../../services/comment.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.sass'
})
export class CommentsSectionComponent {
  constructor(private commentsService: CommentsService) { }

  comments$!: Observable<TComment[]>;

  ngOnInit(): void {
    this.comments$ = this.commentsService.getCommentsTimeline();
    console.log('Comments:', this.comments$);
  }

  // TODO: Move this method to comment component
  formatResponseBody(response: any): string {
    return `@${response.recipient.username} ${response.body}`;
  }
}
