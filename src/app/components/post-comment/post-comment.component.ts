import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comment.service';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-post-comment',
  standalone: true,
  imports: [CardComponent, ButtonComponent, FormsModule],
  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.sass'
})
export class PostCommentComponent {
  constructor(private commentsService: CommentsService) { }

  comment = { body: '', sender: 'baea2164-700d-42d4-bc57-08f3b2a19c03' }

  postComment() {
    this.commentsService.postComment(this.comment).subscribe(response => {
      console.log('postComment response: ', response)
    })
  }
}
