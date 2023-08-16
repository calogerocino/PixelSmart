import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
};

import { CatalogoComponent } from './catalogo.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { CategorieComponent } from './categorie/categorie.component';
import { MarcheComponent } from './marche/marche.component';
import { BuoniscontoComponent } from './buonisconto/buonisconto.component';
import { ProdottoNewComponent } from './prodotto-new/prodotto-new.component';
import { ProdottoEditComponent } from './prodotto-edit/prodotto-edit.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CatalogoEffects } from './state/catalogo.effects';
import { PRODUCT_STATE_NAME } from './state/catalogo.selector';
import { productsReducer } from './state/catalogo.reducer';

const routes: Routes = [
  {
    path: '',
    component: CatalogoComponent,
    children: [
      {
        path: '',
        redirectTo: 'catalogo',
        pathMatch: 'full',
      },
      {
        path: 'prodotti',
        component: ProdottiComponent,
        data: { title: 'Prodotti' },
      },
      {
        path: 'categorie',
        component: CategorieComponent,
        data: { title: 'Categorie' },
      },
      {
        path: 'marche',
        component: MarcheComponent,
        data: { title: 'Marche' },
      },
      {
        path: 'buonisconto',
        component: BuoniscontoComponent,
        data: { title: 'Buoni sconto' },
      },
      {
        path: 'prodotto',
        component: ProdottoNewComponent,
        data: { title: 'Crea prodotto' },
      },
      {
        path: 'edit/:id',
        component: ProdottoEditComponent,
        data: { title: 'Modifica prodotto' },
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
    ProdottoNewComponent,
    ProdottoEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    NgSelectModule,
    DropzoneModule,
    StoreModule.forFeature(PRODUCT_STATE_NAME, productsReducer),
    EffectsModule.forFeature([CatalogoEffects]),
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class CatalogoModule {}
