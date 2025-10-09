import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PricingStore } from '../../../application/pricing.store';
import { Quote } from '../../../domain/model/quote.model';

@Component({
  standalone: true,
  selector: 'app-quote-form',
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent {
  constructor(public store: PricingStore) {}

  data: Quote = { origin: '', destination: '', weight: 0, price: 0 };

  // Lista de lugares
  cities = [
    'Lima',
    'Callao',
    'Arequipa',
    'Trujillo',
    'Cusco',
    'Piura',
    'Chiclayo',
    'Huancayo'
  ];

  async calcular() {
    if (!this.data.origin || !this.data.destination || !this.data.weight) return;
    await this.store.getQuote(this.data);
  }

}
