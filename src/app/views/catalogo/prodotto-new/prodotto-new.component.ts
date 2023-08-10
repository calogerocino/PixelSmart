import { addProduct } from '../state/catalogo.action';
import { Product } from '../../../shared/models/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';

@Component({
  selector: 'app-add-product',
  templateUrl: './prodotto-new.component.html',
  styleUrls: ['./prodotto-new.component.scss'],
})
export class ProdottoNewComponent implements OnInit {
  productForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  showDescriptionErrors() {
    // const descriptionForm = this.productForm.get('description');
    // if (descriptionForm.touched && !descriptionForm.valid) {
    //   if (descriptionForm.errors['required']) {
    //     return 'Description is required';
    //   }

    //   if (descriptionForm.errors['minlength']) {
    //     return 'Description should be of minimum 10 characters length';
    //   }
    // }
    // return true;
  }

  onAddProduct() {
    if (!this.productForm.valid) {
      return;
    }

    const product: Product = {
      title: this.productForm.value.title,
      description: this.productForm.value.description,
    };

    this.store.dispatch(addProduct({ product }));
  }
}
