import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { CommentsService } from '../../services/comment.service';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';
import { DialogComponent } from '../dialog/dialog.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';

interface TComment {
  id: string;
  toId?: string;
  userId: string;
  username: string;
  recipient?: string;
  likes: number;
  liked: boolean;
  body: string;
  createdAt: string;
  yourComment: boolean;
  authUserId?: string;
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CardComponent,
    MiniProfileComponent,
    ButtonComponent,
    LikeButtonComponent,
    PostCommentComponent,
    NgIf,
    NgClass,
    DialogComponent,
    TimeAgoPipe,
    FormsModule,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  readonly dialog = inject(MatDialog);

  constructor(private commentService: CommentsService) {
    this.likeComment = this.likeComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  @Input() comment: TComment = {
    id: '',
    userId: '',
    username: 'nice-username',
    likes: 0,
    liked: false,
    body: 'nice comment body',
    createdAt: '',
    yourComment: false,
  };

  reply = false;
  update = false;

  getProfilePicPath() {
    return `/avatars/image-${this.comment.username}.webp`;
  }

  toggleReply() {
    this.reply = !this.reply;
  }

  toggleUpdate() {
    this.update = !this.update;
  }

  openDeleteDialogConfirmation() {
    this.dialog.open(DialogComponent, {
      data: { onClick: this.deleteComment },
      panelClass: 'my-dialog',
    });
  }

  deleteComment() {
    const hasRecipientId = this.comment.recipient;
    return hasRecipientId
      ? this.commentService.deleteResponse(this.comment.id).subscribe()
      : this.commentService.deleteComment(this.comment.id).subscribe();
  }

  likeComment() {
    const authUserId = this.comment.authUserId;

    if (authUserId) {
      const likeComment = {
        sender: authUserId,
        comment: this.comment.id,
      };

      const likeResponse = {
        sender: authUserId,
        response: this.comment.id,
      };

      const hasRecipientId = this.comment.recipient;
      if (hasRecipientId) {
        this.commentService.likeResponse(likeResponse).subscribe();
      } else {
        this.commentService.likeComment(likeComment).subscribe();
      }
    }
  }

  // TODO: Check if the user is the owner of the comment
  updateComment() {
    const authUserId = this.comment.authUserId;
    const commentId = this.comment.id;

    if (authUserId) {
      const commentUpdate = {
        body: this.comment.body,
      };

      const hasRecipientId = this.comment.recipient;
      if (hasRecipientId) {
        this.commentService
          .updateResponse(commentId, commentUpdate)
          .subscribe();
      } else {
        this.commentService.updateComment(commentId, commentUpdate).subscribe();
      }
    }
  }
}
