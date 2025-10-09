import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {PricingStore} from '../../../application/pricing.store';
import {Quote} from '../../../domain/model/quote.model';
import {QuoteFormComponent} from '../../components/quote-form/quote-form.component';
import {QuoteResultComponent} from '../../components/quote-result/quote-result.component';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-quote',
  imports: [CommonModule, MatCardModule,
    FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, QuoteFormComponent, QuoteResultComponent, MatIconModule, RouterLink,
  ],
  templateUrl: './quote.html',
  styleUrls: ['./quote.css']
})

export class QuoteComponent {
  store = new PricingStore();
  data: Quote = { origin: '', destination: '', weight: 0, price: 0 };

  async calcular() {
    await this.store.getQuote(this.data);
  }

}
