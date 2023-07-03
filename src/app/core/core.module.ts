import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [HeaderComponent,SidebarComponent],
  imports: [
    BrowserModule,
    // StoreModule.forRoot(reducers),
    // EffectsModule.forRoot([]),
    // StoreRouterConnectingModule.forRoot(),
    // StoreDevtoolsModule.instrument()
  ],
  exports: [HeaderComponent,SidebarComponent]
})
export class CoreModule { }
