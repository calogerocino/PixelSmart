import { ProductsState } from './catalogo.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const PRODUCT_STATE_NAME = 'products';
const getProductsState = createFeatureSelector<ProductsState>(PRODUCT_STATE_NAME);

export const getProducts = createSelector(getProductsState, (state) => {
  return state.products;
});

export const getProductById = createSelector(getProductsState, (state, props) => {
  return state.products.find((product) => product.id === props.id);
});
