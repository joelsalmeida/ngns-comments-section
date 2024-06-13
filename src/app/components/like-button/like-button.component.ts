import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.sass'
})
export class LikeButtonComponent {
  @Input() likes : number = 0;
}
