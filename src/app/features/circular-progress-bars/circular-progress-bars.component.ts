import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import * as SharedActions from 'src/app/shared/store/shared.actions';
import * as SharedSelectors from 'src/app/shared/store/shared.selectors';

@Component({
  selector: 'app-circular-progress-bars',
  templateUrl: './circular-progress-bars.component.html',
  styleUrls: ['./circular-progress-bars.component.scss']
})
export class CircularProgressBarsComponent implements OnInit {

  percentual$: Observable<number> = this.store.select(SharedSelectors.selectPercentual);

  constructor(private readonly store: Store) {}

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.store.dispatch(SharedActions.loadPercentual());
    });
  }
}
