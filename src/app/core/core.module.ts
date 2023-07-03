import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    // StoreModule.forRoot(reducers),
    // EffectsModule.forRoot([]),
    // StoreRouterConnectingModule.forRoot(),
    // StoreDevtoolsModule.instrument()
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
