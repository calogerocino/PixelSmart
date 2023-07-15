import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/shared/servizi/firebase.service';
import {
  DropzoneDirective,
  DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.scss'],
})
export class ProdottoComponent implements OnInit {
  defaultNavActiveId = 1;
  htmlText: string;
  impIva: string[] = [];
  items: string[] = [];
  selectedIva: string = null;

  // Inizio dropzone
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };

  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }

  onUpload(event: any): void {
    console.log('onUpload:', event);
    const file = event.target.files[0];
    if (file) {
      console.log(file);
    }
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  // Inizio textbox
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
      ],
    },
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.impIva = ['22 %', '10 %', '4 %', 'Esente'];
  }

  check(e: Event) {
    console.log(e);
  }

  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  onContentChanged = (event: any) => {
    // console.log(event.html);
  };

  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };

  onCreaProdotto(form: NgForm) {
    this.firebaseService
      .insertDatiDB(
        this.firebaseService.ApiURL + this.firebaseService.DB_prodotti,
        {
          titolo: form.value.titoloProdotto,
          codice: form.value.codiceProdotto,
          descrizione: form.value.descrizioneProdotto,
          tag: form.value.tagProdotto,
        }
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
