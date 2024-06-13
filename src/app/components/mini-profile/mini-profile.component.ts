import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mini-profile',
  standalone: true,
  imports: [],
  templateUrl: './mini-profile.component.html',
  styleUrl: './mini-profile.component.sass'
})
export class MiniProfileComponent {
  @Input() profilePic : string = '';
  @Input() username : string = '';
}
