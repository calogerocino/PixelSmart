import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './core/base/base.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'ordini',
        loadChildren: () => import('./views/pages/ordini/ordini.module').then(m => m.OrdiniModule)
      },
      {
        path: 'clienti',
        loadChildren: () => import('./views/pages/clienti/clienti.module').then(m => m.ClientiModule)
      },
      {
        path: 'catalogo',
        loadChildren: () => import('./views/pages/catalogo/catalogo.module').then(m => m.CatalogoModule)
      },
      {
        path: 'contabilita',
        loadChildren: () => import('./views/pages/contabilita/contabilita.module').then(m => m.ContabilitaModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Pagina non trovata',
      'desc': 'Oopps!! La pagina che stai cercando non esiste.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
