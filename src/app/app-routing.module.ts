import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  {
    path: 'buttons',
    loadChildren: () => import('./features/buttons/buttons.module').then(m => m.ButtonsModule)
  },
  {
    path: 'loaders',
    loadChildren: () => import('./features/loaders/loaders.module').then(m => m.LoadersModule)
  },
  {
    path: 'circular-progress-bars',
    loadChildren: () => import('./features/circular-progress-bars/circular-progress-bars.module')
    .then(m => m.CircularProgressBarsModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
