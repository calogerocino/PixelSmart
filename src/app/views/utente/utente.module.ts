import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { UtenteComponent } from './utente.component';
import { UtentiComponent } from './utenti/utenti.component';
import { ProfiloComponent } from './profilo/profilo.component';

const routes: Routes = [
  {
    path: '',
    component: UtenteComponent,
    children: [
      {
        path: '',
        redirectTo: 'utente',
        pathMatch: 'full',
      },
      {
        path: 'utenti',
        component: UtentiComponent,
        data: { title: 'Gestisci utenti' },
      },
      {
        path: 'profilo',
        component: ProfiloComponent,
        data: { title: 'Profilo' },
      },
    ],
  },
];

@NgModule({
  declarations: [UtenteComponent, UtentiComponent, ProfiloComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UtenteModule {}
