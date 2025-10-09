import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentForm } from './shipment-form';

describe('ShipmentForm', () => {
  let component: ShipmentForm;
  let fixture: ComponentFixture<ShipmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShipmentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
