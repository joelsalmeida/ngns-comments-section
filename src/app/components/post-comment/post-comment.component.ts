import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommentsService } from '../../services/comment.service';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-post-comment',
  standalone: true,
  imports: [CardComponent, ButtonComponent, FormsModule],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.sass',
})
export class PostCommentComponent {
  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
  ) {}

  comment = {
    body: '',
    sender: this.authService.authenticatedUser.id as string,
  };

  @Input() commentId = '';
  @Input() toId?: string;
  @Input() recipient = '';
  @Input() isReply = false;

  postComment() {
    const isAuthenticated = this.authService.isAuthenticated;

    if (isAuthenticated) {
      this.commentsService.postComment(this.comment).subscribe((response) => {
        console.log('postComment response: ', response);
      });

      this.comment.body = '';
    }
  }

  replyComment() {
    const isAuthenticated = this.authService.isAuthenticated;

    const replyBody = {
      ...this.comment,
      comment: this.toId? this.toId : this.commentId,
      recipient: this.recipient,
    };

    if (isAuthenticated) {
      this.commentsService.replyComment(replyBody).subscribe((response) => {
        console.log('replyComment response: ', response);
      });

      this.comment.body = '';
    }
  }

  // TODO: Make this method reusable
  getProfilePicPath() {
    const username = this.authService.authenticatedUser.username as string;
    return `/avatars/image-${username}.webp`;
  }
}
