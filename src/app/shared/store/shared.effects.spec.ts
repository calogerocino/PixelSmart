import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedEffects } from './shared.effects';

describe('SharedEffects', () => {
  let actions$: Observable<Action>;
  let effects: SharedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SharedEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SharedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
