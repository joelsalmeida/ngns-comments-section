import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-profile',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mini-profile.component.html',
  styleUrl: './mini-profile.component.sass',
})
export class MiniProfileComponent {
  @Input() profilePic = '';
  @Input() username = '';
  @Input() yourComment = false;
}
