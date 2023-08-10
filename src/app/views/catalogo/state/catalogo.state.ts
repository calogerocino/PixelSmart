import { Product } from "src/app/shared/models/product.model";

export interface ProductsState {
  products: Product[];
}

export const initialState: ProductsState = {
  products: null,
};
