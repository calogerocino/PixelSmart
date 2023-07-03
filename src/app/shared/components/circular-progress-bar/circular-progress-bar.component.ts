import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-circular-progress-bar',
  templateUrl: './circular-progress-bar.component.html',
  styleUrls: ['./circular-progress-bar.component.scss']
})
export class CircularProgressBarComponent implements OnChanges {
  @Input() percentual = 0;

  pointers = Array.from({ length: 100 }, (_, i) => i + 1);
  color: '#0f0' | '#ff0' | '#f00' = '#f00';

  ngOnChanges() {
    this.percentual = this.getPercentual(this.percentual);
    if (this.percentual < 33) {
      this.color = '#f00';
    } else if (this.percentual >= 33 && this.percentual < 66) {
      this.color = '#ff0';
    } else {
      this.color = '#0f0';
    }
  }

  private getPercentual(percentual: number): number {
    return Math.max(0, Math.min(percentual, 100));
  }
}
