import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentsService } from '../../services/comment.service';
import { CardComponent } from '../card/card.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';
import { PostCommentComponent } from '../post-comment/post-comment.component';

type TComment = {
  id: string,
  userId: string,
  username: string,
  recipient?: string,
  likes: number
  body?: string
  yourComment: boolean
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CardComponent, MiniProfileComponent, LikeButtonComponent, PostCommentComponent, NgIf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass'
})
export class CommentComponent {
  constructor(private commentService: CommentsService) { }

  @Input() comment: TComment = {
    id: '', userId: '', username: 'nice-username', likes: 0, body: 'nice comment body', yourComment: false
  }

  reply: boolean = false;

  getProfilePicPath() {
    return `/avatars/image-${this.comment.username}.webp`
  }

  toggleReply() {
    this.reply = !this.reply;
  }

  // TODO: Add confirmation dialog before deleting comment
  deleteComment() {
    const hasRecipientId = this.comment.recipient;
    return hasRecipientId ?
      this.commentService.deleteResponse(this.comment.id).subscribe() : this.commentService.deleteComment(this.comment.id).subscribe();
  }
}
