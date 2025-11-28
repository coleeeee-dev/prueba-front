// src/app/shipments/presentation/views/shipment-form/shipment-form.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ShipmentsApi } from '../../../infrastructure/shipments-api';
import { ShipmentBackendResponse } from '../../../infrastructure/shipments-backend-response';

interface FrequentClient {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
}

@Component({
  standalone: true,
  selector: 'app-shipment-form',
  templateUrl: './shipment-form.html',
  styleUrls: ['./shipment-form.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatSnackBarModule,
    MatCheckboxModule
  ]
})
export class ShipmentFormComponent {

  private fb = inject(FormBuilder);
  private api = inject(ShipmentsApi);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  cities: string[] = [
    'Lima',
    'Arequipa',
    'Cusco',
    'Trujillo',
    'Piura'
  ];

  frequent: FrequentClient[] = [
    {
      name: 'Empresa ABC SAC',
      phone: '999999999',
      email: 'contacto@abc.pe',
      address: 'Av. Principal 123',
      city: 'Lima'
    },
    {
      name: 'Cliente Frecuente 2',
      phone: '988888888',
      email: 'cliente2@demo.com',
      address: 'Jr. Comercio 456',
      city: 'Arequipa'
    }
  ];

  saving = false;

  form = this.fb.group({
    sender: this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required]
    }),
    recipient: this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required]
    }),
    saveAsFrequent: [false],
    pkg: this.fb.group({
      description: ['', Validators.required],
      weightKg: [null, Validators.required],
      dims: [''],
      declared: [null, Validators.required]
    })
  });

  private buildAddress(address: { address?: string | null; city?: string | null } | null | undefined) {
    const city = (address?.city ?? '').trim() || 'Lima';

    return {
      street: (address?.address ?? '').trim() || 'Dirección no especificada',
      city,
      state: city,
      zipCode: '00000',
      country: 'Perú'
    };
  }

  useFrequent(c: FrequentClient): void {
    this.form.patchValue({
      sender: {
        name: c.name,
        phone: c.phone,
        email: c.email,
        address: c.address,
        city: c.city
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const value = this.form.value;

    const sender = value.sender!;
    const recipient = value.recipient!;
    const pkg = value.pkg!;

    const originAddress = this.buildAddress({
      address: sender?.address ?? '',
      city: sender?.city ?? ''
    });

    const destinationAddress = this.buildAddress({
      address: recipient?.address ?? '',
      city: recipient?.city ?? ''
    });

    const payload: any = {
      sender: {
        name: sender?.name,
        email: sender?.email,
        phone: sender?.phone
      },
      recipient: {
        name: recipient?.name,
        email: recipient?.email,
        phone: recipient?.phone
      },
      originAddress,
      destinationAddress,
      weight: Number(pkg?.weightKg ?? 0.1) || 0.1,
      courierId: 1
    };

    this.api.create(payload).subscribe({
      next: (res: ShipmentBackendResponse) => {
        this.snackBar.open(
          `Envío creado con código ${res.trackingCode}`,
          'OK',
          { duration: 5000 }
        );
        // ⬇️ Aquí el cambio: volvemos al Dashboard (ruta raíz)
        this.router.navigateByUrl('/');
        // Si tu dashboard está en '/dashboard', cambia a:
        // this.router.navigateByUrl('/dashboard');
      },
      error: (err: unknown) => {
        console.error('Error creando envío', err);
        this.snackBar.open(
          'Ocurrió un error creando el envío',
          'Cerrar',
          { duration: 5000 }
        );
        this.saving = false;
      },
      complete: () => {
        this.saving = false;
      }
    });
  }

  cancel(): void {
    // En cancelar también tiene sentido volver al Dashboard
    this.router.navigateByUrl('/');
    // O '/dashboard' si esa es tu ruta
  }
}
