import { updateProduct } from '../state/catalogo.action';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';
import { getProductById } from '../state/catalogo.selector';
import { AppState } from 'src/app/shared/app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prodotto-edit',
  templateUrl: './prodotto-edit.component.html',
  styleUrls: ['./prodotto-edit.component.scss'],
})
export class ProdottoEditComponent implements OnInit, OnDestroy {
  product: Product;
  productForm: FormGroup;
  productSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productSubscription = this.store
        .select(getProductById, { id })
        .subscribe((data) => {
          this.product = data;
          this.createForm();
        });
    });
  }

  createForm() {
    this.productForm = new FormGroup({
      title: new FormControl(this.product.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.product.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (!this.productForm.valid) {
      return;
    }

    const title = this.productForm.value.title;
    const description = this.productForm.value.description;

    const product: Product = {
      id: this.product.id,
      title,
      description,
    };

    //dispatch the action
    this.store.dispatch(updateProduct({ product }));
    this.router.navigate(['catalogo/prodotti']);
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
