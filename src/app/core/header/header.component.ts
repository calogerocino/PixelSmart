import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  listItems: string[] = ['home', 'buttons', 'loaders', 'circular-progress-bars'];
}
