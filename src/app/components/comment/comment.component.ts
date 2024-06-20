import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { CommentsService } from '../../services/comment.service';
import { CardComponent } from '../card/card.component';
import { DialogComponent } from '../dialog/dialog.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';

type TComment = {
  id: string,
  userId: string,
  username: string,
  recipient?: string,
  likes: number,
  liked: boolean,
  body: string
  createdAt: string,
  yourComment: boolean,
  authUserId?: string
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CardComponent, MiniProfileComponent, LikeButtonComponent, PostCommentComponent, NgIf, DialogComponent, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CommentComponent {
  readonly dialog = inject(MatDialog)

  constructor(private commentService: CommentsService,) {
    this.likeComment = this.likeComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  @Input() comment: TComment = {
    id: '', userId: '', username: 'nice-username', likes: 0, liked: false, body: 'nice comment body', createdAt: '', yourComment: false
  }

  reply: boolean = false;

  getProfilePicPath() {
    return `/avatars/image-${this.comment.username}.webp`
  }

  toggleReply() {
    this.reply = !this.reply;
  }

  openDeleteDialogConfirmation() {
    this.dialog.open(DialogComponent, { data: { onClick: this.deleteComment }, panelClass: 'my-dialog' });
  }

  deleteComment() {
    const hasRecipientId = this.comment.recipient;
    return hasRecipientId ?
      this.commentService.deleteResponse(this.comment.id).subscribe() : this.commentService.deleteComment(this.comment.id).subscribe();
  }

  likeComment() {
    const authUserId = this.comment.authUserId;

    if (authUserId) {
      const like = {
        sender: authUserId,
        comment: this.comment.id
      }

      this.commentService.likeComment(like).subscribe();
    }
  }
}
