import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularProgressBarsComponent } from './circular-progress-bars.component';

describe('CircularProgressBarsComponent', () => {
  let component: CircularProgressBarsComponent;
  let fixture: ComponentFixture<CircularProgressBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircularProgressBarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularProgressBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
