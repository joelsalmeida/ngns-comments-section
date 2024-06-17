import { Component } from '@angular/core';
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
  styleUrl: './post-comment.component.sass'
})
export class PostCommentComponent {
  constructor(private commentsService: CommentsService, private authService: AuthService) { }

  comment = { body: '', sender: this.authService.authenticatedUser.id as string }


  postComment() {
    const isAuthenticated = this.authService.isAuthenticated;

    if (isAuthenticated) {
      this.commentsService.postComment(this.comment).subscribe(response => {
        console.log('postComment response: ', response)
      })

      this.comment.body = '';
    }
  }

  // TODO: Make this method reusable
  getProfilePicPath() {
    const username = this.authService.authenticatedUser.username as string;
    return `/avatars/image-${username}.webp`
  }
}
