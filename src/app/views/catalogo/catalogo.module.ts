import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { QuillModule } from "ngx-quill";
import { TagInputModule } from 'ngx-chips';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
// import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


import { CatalogoComponent } from "./catalogo.component";
import { ProdottiComponent } from "./prodotti/prodotti.component";
import { CategorieComponent } from "./categorie/categorie.component";
import { MarcheComponent } from "./marche/marche.component";
import { BuoniscontoComponent } from "./buonisconto/buonisconto.component";
import { ProdottoComponent } from "./prodotto/prodotto.component";

const routes: Routes = [
  {
    path: "",
    component: CatalogoComponent,
    children: [
      {
        path: "",
        redirectTo: "catalogo",
        pathMatch: "full",
      },
      {
        path: "prodotti",
        component: ProdottiComponent,
        data: { title: "Prodotti" },
      },
      {
        path: "categorie",
        component: CategorieComponent,
        data: { title: "Categorie" },
      },
      {
        path: "marche",
        component: MarcheComponent,
        data: { title: "Marche" },
      },
      {
        path: "buonisconto",
        component: BuoniscontoComponent,
        data: { title: "Buoni sconto" },
      },
      {
        path: "prodotto",
        component: ProdottoComponent,
        data: { title: "Prodotto" },
      },
    ],
  },
];

@NgModule({
  declarations: [
    CatalogoComponent,
    ProdottiComponent,
    CategorieComponent,
    MarcheComponent,
    BuoniscontoComponent,
    ProdottoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    // QuillModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    // NgxMaskModule.forRoot({ validation: true}),
    NgSelectModule,
    DropzoneModule,
    // SweetAlert2Module.forRoot({
    //   provideSwal: () => import('sweetalert2').then(({ default: swal }) => swal.mixin({
    //     confirmButtonText: `Conferma`,
    //     cancelButtonText: `Annulla`
    //   }))
    // }),
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class CatalogoModule {}
