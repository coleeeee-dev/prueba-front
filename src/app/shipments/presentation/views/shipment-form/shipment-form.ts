// src/app/shipments/presentation/views/shipment-form/shipment-form.ts

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShipmentsApi } from '../../../infrastructure/shipments-api';

@Component({
  selector: 'app-shipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shipment-form.html',
  styleUrls: ['./shipment-form.css']
})
export class ShipmentForm {
  private fb = inject(FormBuilder);
  private api = inject(ShipmentsApi);
  private router = inject(Router);

  // Puedes ajustar nombres de controles según tu HTML,
  // lo importante es cómo se usan en submit()
  form = this.fb.nonNullable.group({
    // Datos remitente
    senderName: ['', Validators.required],
    senderEmail: ['', [Validators.required, Validators.email]],
    senderPhone: ['', Validators.required],
    senderStreet: ['', Validators.required],
    senderCity: ['', Validators.required],

    // Datos destinatario
    recipientName: ['', Validators.required],
    recipientEmail: ['', [Validators.required, Validators.email]],
    recipientPhone: ['', Validators.required],
    recipientStreet: ['', Validators.required],
    recipientCity: ['', Validators.required],

    // Paquete / envío
    weightKg: [1, [Validators.required, Validators.min(0.1)]],
    courierId: [1, Validators.required],
    deliveryPersonId: ['']
  });

  submitting = false;

  submit(): void {
    if (this.submitting) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const v = this.form.getRawValue();

    // Payload alineado al backend (CreateShipmentResource)
    const payload = {
      sender: {
        name: v.senderName,
        email: v.senderEmail,
        phone: v.senderPhone
      },
      recipient: {
        name: v.recipientName,
        email: v.recipientEmail,
        phone: v.recipientPhone
      },
      originAddress: {
        street: v.senderStreet,
        city: v.senderCity,
        state: 'Lima',
        zipCode: '15000',
        country: 'Peru'
      },
      destinationAddress: {
        street: v.recipientStreet,
        city: v.recipientCity,
        state: 'Lima',
        zipCode: '15000',
        country: 'Peru'
      },
      weight: Number(v.weightKg),
      courierId: Number(v.courierId),
      deliveryPersonId: v.deliveryPersonId || null
    };

    this.api.create(payload).subscribe({
      next: () => {
        this.submitting = false;
        // Puedes cambiar la ruta según tu app (ej. '/shipments' o '/dashboard')
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error('Error creating shipment', err);
        // Aquí podrías mostrar un mensaje en la UI
        this.submitting = false;
      }
    });
  }
}
