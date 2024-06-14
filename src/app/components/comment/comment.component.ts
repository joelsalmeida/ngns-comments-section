import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';

type TComment = {
  username: string,
  likes: number
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CardComponent, MiniProfileComponent, LikeButtonComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass'
})
export class CommentComponent {
  @Input() comment: TComment = { username: 'nice-username', likes: 0 };
}
