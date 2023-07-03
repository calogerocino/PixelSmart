import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ButtonsComponent } from './buttons.component';

@NgModule({
  declarations: [ButtonsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: ButtonsComponent
    }]),
    SharedModule
  ]
})
export class ButtonsModule {}
