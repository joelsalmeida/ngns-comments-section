import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { MiniProfileComponent } from '../mini-profile/mini-profile.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CardComponent, MiniProfileComponent, LikeButtonComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.sass'
})
export class CommentComponent {
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:3000/comment/timeline').subscribe((comments) => {
      console.log(comments)
    })
  }
}
