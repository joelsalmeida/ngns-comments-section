import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.sass',
})
export class LikeButtonComponent {
  @Input() likes = 0;
  @Input() liked = false;
  @Input() onClick: () => void = () => {
    console.log('clicked');
  };

  onKeyUp(event: KeyboardEvent) {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this.onClick();
    }
  }
}
