import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolleComponent } from './bolle.component';

describe('BolleComponent', () => {
  let component: BolleComponent;
  let fixture: ComponentFixture<BolleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BolleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
