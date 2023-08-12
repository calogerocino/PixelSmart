import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { OrdiniComponent } from "./ordini.component";
import { OrdiniClientiComponent } from "./ordini-clienti/ordini-clienti.component";
import { BolleComponent } from "./bolle/bolle.component";
import { CarrelliComponent } from "./carrelli/carrelli.component";

const routes: Routes = [
  {
    path: '',
    component: OrdiniComponent,
    children: [
      {
        path: '',
        redirectTo: 'ordini',
        pathMatch: 'full'
      },
      {
        path: 'ordiniclienti',
        component: OrdiniClientiComponent,
        data: { title: "Ordini" },
      },
      {
        path: 'bolle',
        component: BolleComponent,
        data: { title: "Bolle di vendita" },
      },
      {
        path: 'carrelli',
        component: CarrelliComponent,
        data: { title: "Carrelli" },
      }
    ]
  }
]

@NgModule({
  declarations: [OrdiniComponent, BolleComponent, CarrelliComponent,OrdiniComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OrdiniModule {}
