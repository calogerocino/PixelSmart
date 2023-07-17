import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdiniclientiComponent } from './ordiniclienti.component';

describe('OrdiniclientiComponent', () => {
  let component: OrdiniclientiComponent;
  let fixture: ComponentFixture<OrdiniclientiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdiniclientiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdiniclientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
