import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoadersComponent } from './loaders.component';

@NgModule({
  declarations: [LoadersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: LoadersComponent
    }]),
    SharedModule
  ]
})
export class LoadersModule {}
