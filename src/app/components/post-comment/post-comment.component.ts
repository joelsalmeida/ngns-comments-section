import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-post-comment',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.sass'
})
export class PostCommentComponent {

}
