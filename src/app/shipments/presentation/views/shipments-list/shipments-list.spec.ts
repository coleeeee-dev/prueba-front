import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentsListComponent } from './shipments-list';

// Si el componente usa Router, Material, etc., impórtalos aquí
import { RouterTestingModule } from '@angular/router/testing';

describe('ShipmentsListComponent', () => {
  let component: ShipmentsListComponent;
  let fixture: ComponentFixture<ShipmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ShipmentsListComponent,   // 👈 standalone
        RouterTestingModule       // 👈 solo si hay routerLink en la plantilla
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
