import { Component, computed, Input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PricingStore } from '../../../application/pricing.store';

@Component({
  standalone: true,
  selector: 'app-quote-result',
  imports: [CommonModule, MatCardModule, MatSnackBarModule, TranslateModule],
  templateUrl: './quote-result.component.html',
  styleUrl: './quote-result.component.css'
})
export class QuoteResultComponent {

  constructor(public store: PricingStore) {}

  private router = inject(Router);
  private snack  = inject(MatSnackBar);
  private i18n   = inject(TranslateService);

  quote = computed(() => this.store.quote());
  selectedOption = signal<string | null>(null);

  shippingOptions = computed(() => {
    const q = this.quote();
    if (!q) return [];
    const base = q.price ?? 0;

    return [
      {
        code: 'EC',
        type: 'Express Courier',
        price: (base * 1.4).toFixed(2),
        time: this.i18n.instant('pricing.quote.time.fast'), // "1-2 días hábiles"
        color: '#ff9800',
        rating: 4.8,
        tags: [
          this.i18n.instant('pricing.quote.tags.liveTracking'),
          this.i18n.instant('pricing.quote.tags.insurance'),
          this.i18n.instant('pricing.quote.tags.doorDelivery')
        ],
        recommended: true
      },
      {
        code: 'FD',
        type: 'Fast Delivery',
        price: (base * 1.2).toFixed(2),
        time: this.i18n.instant('pricing.quote.time.medium'), // "2-3 días hábiles"
        color: '#2196f3',
        rating: 4.6,
        tags: [
          this.i18n.instant('pricing.quote.tags.basicTracking'),
          this.i18n.instant('pricing.quote.tags.pickupPoint'),
          this.i18n.instant('pricing.quote.tags.nationalCoverage')
        ],
        recommended: false
      },
      {
        code: 'PL',
        type: 'Premium Logistics',
        price: (base * 1.6).toFixed(2),
        time: this.i18n.instant('pricing.quote.time.express'), // "24 horas"
        color: '#9c27b0',
        rating: 4.9,
        tags: [
          this.i18n.instant('pricing.quote.tags.express'),
          this.i18n.instant('pricing.quote.tags.premiumInsurance'),
          '24/7',
          this.i18n.instant('pricing.quote.tags.photoProof')
        ],
        recommended: false
      },
      {
        code: 'ES',
        type: 'Economy Shipping',
        price: (base * 0.9).toFixed(2),
        time: this.i18n.instant('pricing.quote.time.slow'), // "3-5 días hábiles"
        color: '#4caf50',
        rating: 4.2,
        tags: [
          this.i18n.instant('pricing.quote.tags.lowCost'),
          this.i18n.instant('pricing.quote.tags.webTracking'),
          this.i18n.instant('pricing.quote.tags.localNetwork')
        ],
        recommended: false
      }
    ];
  });

  selectOption(code: string) {
    this.selectedOption.set(code);
  }

  isSelected(code: string) {
    return this.selectedOption() === code;
  }

  onProceed() {
    const msg = this.i18n.instant('pricing.quote.proceed.confirm'); // "¡Entendido!"
    this.snack.open(msg, undefined, { duration: 1500 });
    this.router.navigateByUrl('/dashboard');
  }
}
