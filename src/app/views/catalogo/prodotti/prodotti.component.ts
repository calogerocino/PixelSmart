import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "../../../shared/servizi/firebase.service";
import { Observable } from "rxjs";
import { Product } from "src/app/shared/models/product.model";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/shared/app.state";
import { getProducts } from "../state/catalogo.selector";
import { deleteProduct, loadProducts } from "../state/catalogo.action";

// import Swal from "sweetalert2";

@Component({
  selector: "app-prodotti",
  templateUrl: "./prodotti.component.html",
  styleUrls: ["./prodotti.component.scss"],
})
export class ProdottiComponent implements OnInit {
  products: Observable<Product[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.products = this.store.select(getProducts);
    this.store.dispatch(loadProducts());
  }

  onDeleteProduct(id: string) {
    if (confirm('Sei sicuro di voler eliminare?')) {
      this.store.dispatch(deleteProduct({ id }));
    }
  }
}
