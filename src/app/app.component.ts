import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentComponent } from './components/comment/comment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'ngns-comments-section';
}
