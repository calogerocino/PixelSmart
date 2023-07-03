import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CircularProgressBarsComponent } from './circular-progress-bars.component';

@NgModule({
  declarations: [CircularProgressBarsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: CircularProgressBarsComponent
    }]),
    SharedModule
  ]
})
export class CircularProgressBarsModule {}
