import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommentsSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'ngns-comments-section';
}
