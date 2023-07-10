import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

//Component
import { ContabilitaComponent } from './contabilita.component';
import { FornitoriComponent } from './fornitori/fornitori.component';
import { FattureComponent } from './fatture/fatture.component';
import { ScadenzeComponent } from './scadenze/scadenze.component';


const routes: Routes = [
  {
    path: "",
    component: ContabilitaComponent,
    children: [
      {
        path: "",
        redirectTo: "contabilita",
        pathMatch: "full",
      },
      {
        path: "fornitori",
        component: FornitoriComponent,
        data: { title: "Lista fornitori" },
      },
      {
        path: "fatture",
        component: FattureComponent,
        data: { title: "Lista fatture" },
      },
      {
        path: "scadenze",
        component: ScadenzeComponent,
        data: { title: "Lista scadenze" },
      },
    ],
  },
];


@NgModule({
  declarations: [ContabilitaComponent, FattureComponent, ScadenzeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class ContabilitaModule { }
