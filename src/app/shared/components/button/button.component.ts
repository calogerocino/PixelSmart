import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() text = 'Click here';
  @Input() color = '#1e9bff';
  @Input() background = '#27282c';
  @Input() disabled = false;
}
