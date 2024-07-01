import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

type TButtonColor = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.sass',
})
export class ButtonComponent {
  @Input() color: TButtonColor = 'primary';
}
