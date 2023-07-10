import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { ClientiComponent } from "./clienti.component";
import { ListaclientiComponent } from "./listaclienti/listaclienti.component";
import { ClienteComponent } from "./cliente/cliente.component";
import { IndirizziComponent } from "./indirizzi/indirizzi.component";

const routes: Routes = [
  {
    path: "",
    component: ClientiComponent,
    children: [
      {
        path: "",
        redirectTo: "clienti",
        pathMatch: "full",
      },
      {
        path: "listaclienti",
        component: ListaclientiComponent,
        data: { title: "Lista clienti" },
      },
      {
        path: "indirizzi",
        component: IndirizziComponent,
        data: { title: "Indirizzi" },
      },
    ],
  },
];

@NgModule({
  declarations: [
    ClientiComponent,
    ClienteComponent,
    IndirizziComponent,
    ListaclientiComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ClientiModule {}
