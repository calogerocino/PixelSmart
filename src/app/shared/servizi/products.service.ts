import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
 constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(
        `${environment.firebase.databaseURL}/prodotti.json`
      )
      .pipe(
        map((data) => {
          const products: Product[] = [];
          for (let key in data) {
            products.push({ ...data[key], id: key });
          }
          return products;
        })
      );
  }

  addProduct(product: Product): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `${environment.firebase.databaseURL}/prodotti.json`,
      product
    );
  }

  updateProduct(product: Product) {
    const postData = {
      [product.id]: { title: product.title, description: product.description },
    };
    return this.http.patch(
      `${environment.firebase.databaseURL}/prodotti.json`,
      postData
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(
      `${environment.firebase.databaseURL}/prodotti/${id}.json`
    );
  }
}
