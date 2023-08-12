import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdiniClientiComponent } from './ordini-clienti.component';

describe('OrdiniClientiComponent', () => {
  let component: OrdiniClientiComponent;
  let fixture: ComponentFixture<OrdiniClientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdiniClientiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdiniClientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
