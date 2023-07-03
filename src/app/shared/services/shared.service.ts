import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Response } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  percentual = 0;

  loadPercentual(): Observable<Response<number>> {
    this.percentual = this.percentual + 1;
    return of({result: this.percentual, errorMessage: null});
  }
}
