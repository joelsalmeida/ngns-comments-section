import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';

type TComment = {
  username: string,
  recipient?: string,
  likes: number
  body?: string
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CardComponent, MiniProfileComponent, LikeButtonComponent, NgIf],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass'
})
export class CommentComponent {
  @Input() comment: TComment = {
    username: 'nice-username', likes: 0, body: 'nice comment body'
  }

  getProfilePicPath() {
    return `/avatars/image-${this.comment.username}.webp`
  }
}
