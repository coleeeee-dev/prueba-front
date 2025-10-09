import {Injectable} from '@angular/core';
import {Quote} from '../domain/model/quote.model';

@Injectable({providedIn: 'root'})
export class PricingApi {

  async getQuote(data: Quote): Promise<Quote> {
    return new Promise(resolve => {
      setTimeout(() => {
        const baseRate = 5;
        const pricePerKg = 3.5;
        const distanceFactor = data.origin !== data.destination ? 1.2 : 1;
        const total = baseRate + data.weight * pricePerKg * distanceFactor;

        resolve({
          ...data,
          price: parseFloat(total.toFixed(2))
        });
      }, 800);
    });
  }
}


