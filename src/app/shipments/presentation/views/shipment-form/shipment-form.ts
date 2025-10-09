import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { ShipmentsApi } from '../../../infrastructure/shipments-api';
import {TranslatePipe} from '@ngx-translate/core';

type FrequentClient = { name: string; phone: string; address: string; city: string };

@Component({
  standalone: true,
  selector: 'app-shipment-form',
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCheckboxModule, MatButtonModule, MatIconModule, MatDividerModule, MatListModule, TranslatePipe
  ],
  templateUrl: './shipment-form.html',
  styleUrls: ['./shipment-form.css']
})
export class ShipmentFormComponent {
  private fb = inject(FormBuilder);
  private api = inject(ShipmentsApi);
  private router = inject(Router);

  cities = ['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo', 'Piura'];

  // mock de clientes frecuentes
  frequent: FrequentClient[] = [
    { name: 'TechStore SA',  phone: '+51 999 123 456', address: 'Av. Principal 123, Lima',  city: 'Lima' },
    { name: 'Moda Express',  phone: '+51 999 654 321', address: 'Jr. Comercio 456, Cusco', city: 'Cusco' },
    { name: 'Electro Mundial', phone: '+51 999 789 012', address: 'Av. Industrial 789, Arequipa', city: 'Arequipa' },
  ];

  form = this.fb.group({
    sender: this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: [''],
      address: [''],
      city: ['']
    }),
    recipient: this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: [''],
      address: [''],
      city: ['']
    }),
    pkg: this.fb.group({
      description: [''],
      weightKg: [null as number | null, [Validators.required]],
      dims: [''],
      declared: [null as number | null]
    }),
    saveAsFrequent: [false]
  });

  saving = false;

  useFrequent(c: FrequentClient) {
    this.form.patchValue({
      recipient: {
        name: c.name,
        phone: c.phone,
        address: c.address,
        city: c.city
      }
    });
  }

  cancel() { this.router.navigateByUrl('/dashboard'); }

  async submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving = true;

    // Generar un código simple único
    const rand = Math.floor(100 + Math.random() * 900);
    const code = `SND-${rand}`;

    const v = this.form.value;
    // Usaremos lo que tu dashboard necesita:
    const payload = {
      // json-server puede generar id si lo omites, pero añadimos por estabilidad:
      id: Date.now(),
      code,
      client: v.recipient?.name ?? 'Cliente',
      destination: v.recipient?.city ?? '',
      status: 'registered' as const,
      dateISO: new Date().toISOString().slice(0, 10) // yyyy-MM-dd
    };

    this.api.create(payload).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: () => this.saving = false,
      complete: () => this.saving = false
    });
  }
}
