import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ButtonComponent } from "./components/button/button.component";
import { CircularProgressBarComponent } from './components/circular-progress-bar/circular-progress-bar.component';
import { LoaderComponent } from "./components/loader/loader.component";
import { SharedEffects } from "./store/shared.effects";
import { reducer, sharedFeatureKey } from "./store/shared.reducer";


@NgModule({
  declarations: [
    ButtonComponent,
    LoaderComponent,
    CircularProgressBarComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(sharedFeatureKey, reducer),
    EffectsModule.forFeature([SharedEffects])
  ],
  exports: [
    ButtonComponent,
    LoaderComponent,
    CircularProgressBarComponent
  ],
  providers: []
})
export class SharedModule {}
