import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/shared/app.state';
import { getLoading } from 'src/app/shared/store/shared.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [],
})
export class AuthComponent {
  showLoading$: Observable<boolean> = this.store.select(getLoading);

  constructor(private readonly store: Store<AppState>) {}
}
