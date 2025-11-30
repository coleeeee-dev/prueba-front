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
import { AuctionStore } from '../../application/auction.store';
import { AuctionAssembler } from '../../infrastructure/auction-assembler';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CourierOption } from '../../domain/model/courier-option.entity';


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
    MatSnackBarModule,
    TranslateModule
  ]

})
export class AuctionComponent {
  form: FormGroup;


  constructor(
    private fb: FormBuilder,
    public auctionStore: AuctionStore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
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


  onSelectCourier(option: CourierOption): void {
    this.auctionStore.selectCourier(option);

    this.snackBar.open(
      `Your shipment will be sent with courier ${option.name}!`,
      'OK',
      { duration: 3000 }
    );

    this.router.navigate(['/dashboard']);
  }


  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = AuctionAssembler.toCreatePayload(this.form.value);
    this.auctionStore.createAuctionRequest(payload);
  }
}
