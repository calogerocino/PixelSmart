import {
  loadProductsSuccess,
  addProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
} from './catalogo.action';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './catalogo.state';

const _productsReducer = createReducer(
  initialState,
  on(addProductSuccess, (state, action) => {
    let product = { ...action.product };

    return {
      ...state,
      products: [...state.products, product],
    };
  }),
  on(updateProductSuccess, (state, action) => {
    const updatedProducts = state.products.map((product) => {
      return action.product.id === product.id ? action.product : product;
    });

    return {
      ...state,
      products: updatedProducts,
    };
  }),
  on(deleteProductSuccess, (state, { id }) => {
    const updatedProducts = state.products.filter((product) => {
      return product.id !== id;
    });

    return {
      ...state,
      products: updatedProducts,
    };
  }),
  on(loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products,
    };
  })
);

export function productsReducer(state, action) {
  return _productsReducer(state, action);
}
