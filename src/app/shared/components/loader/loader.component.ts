import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
  @Input() color = 'black';
  @Input() size: 's' | 'm' | 'l' = 's';
  @Input() dots = 12;

  pointSize: '6px' | '8px' | '10px' = '6px';
  radius: '20px' | '28px' | '35px' = '20px';
  loaderSize: '50px' | '70px' | '90px' = '50px';
  indexDots: number[] = [];

  ngOnInit() {
    this.indexDots = Array.from({ length: this.dots }, (_, i) => i + 1);
    switch(this.size) {
      case 's':
        this.pointSize = '6px';
        this.radius = '20px';
        this.loaderSize = '50px';
        break;
      case 'm':
        this.pointSize = '8px';
        this.radius = '28px';
        this.loaderSize = '70px';
        break;
      case 'l':
        this.pointSize = '10px';
        this.radius = '35px';
        this.loaderSize = '90px';
        break;
    }
  }
}
