import {Injectable, signal} from '@angular/core';
import {Quote} from '../domain/model/quote.model';
import {PricingApi} from '../infrastructure/pricing-api';


@Injectable({providedIn: 'root'})
export class PricingStore {
  private api = new PricingApi;

  // Estado reactivo (puede verse en la vista)
  quote = signal<Quote | null>(null);
  loading = signal(false);

  async getQuote(data:Quote) {
    this.loading.set(true);
    const result = await this.api.getQuote(data);
    this.quote.set(result);
    this.loading.set(false);
  }

}
