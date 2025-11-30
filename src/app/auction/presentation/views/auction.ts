import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-auction',
  templateUrl: './auction.html',
  styleUrls: ['./auction.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class AuctionComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      weightKg: [null, [Validators.required, Validators.min(0.1)]],
      lengthCm: [null, [Validators.required, Validators.min(1)]],
      widthCm: [null, [Validators.required, Validators.min(1)]],
      heightCm: [null, [Validators.required, Validators.min(1)]],
      declaredValue: [null, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Por ahora solo mostramos por consola.
    // Más adelante aquí llamaremos al backend /api/v1/auction-requests.
    console.log('Auction request payload', this.form.value);
  }
}
