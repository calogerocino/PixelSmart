import { map, mergeMap, switchMap } from 'rxjs/operators';
import { addProduct, addProductSuccess, deleteProduct, deleteProductSuccess, loadProducts, loadProductsSuccess, updateProduct, updateProductSuccess } from './catalogo.action';
import { ProductsService } from 'src/app/shared/servizi/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class CatalogoEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productsService: ProductsService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      mergeMap((action) => {
        return this.productsService.getProducts().pipe(
          map((products) => {
            return loadProductsSuccess({ products });
          })
        );
      })
    );
  });

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProduct),
      mergeMap((action) => this.productsService.addProduct(action.product).pipe(
        map((data) => {
          const product = { ...action.product, id: data.name };
          return addProductSuccess({ product });
        })
      ))
    );
  });

   updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateProduct),
      switchMap((action) => {
        return this.productsService.updateProduct(action.product).pipe(
          map((data) => {
            return updateProductSuccess({ product: action.product });
          })
        );
      })
    );
  });
  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) => {
        return this.productsService.deleteProduct(action.id).pipe(
          map((data) => {
            return deleteProductSuccess({ id: action.id });
          })
        );
      })
    );
  });

}
