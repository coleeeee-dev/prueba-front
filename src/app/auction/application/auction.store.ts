import { Injectable, signal } from '@angular/core';
import { AuctionApi } from '../infrastructure/auction-api';
import { AuctionAssembler } from '../infrastructure/auction-assembler';
import { AuctionRequest } from '../domain/model/auction-request.entity';
import { CreateAuctionRequestPayload } from '../infrastructure/auction-request.response';
import { CourierOption } from '../domain/model/courier-option.entity';


@Injectable({
  providedIn: 'root'
})
export class AuctionStore {
  private readonly _loading = signal(false);
  private readonly _lastRequest = signal<AuctionRequest | null>(null);
  private readonly _error = signal<string | null>(null);

  private readonly _couriers = signal<CourierOption[]>([]);
  private readonly _selectedCourier = signal<CourierOption | null>(null);

  readonly couriers = this._couriers.asReadonly();
  readonly selectedCourier = this._selectedCourier.asReadonly();


  readonly loading = this._loading.asReadonly();
  readonly lastRequest = this._lastRequest.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private api: AuctionApi) {}

  private loadCouriers(weightKg: number): void {
    this.api.getCouriers().subscribe({
      next: (responses) => {
        const options = AuctionAssembler.toCourierOptions(responses, weightKg);
        this._couriers.set(options);
      },
      error: (err) => {
        console.error('Error loading couriers', err);
        this._couriers.set([]);
      }
    });
  }

  selectCourier(option: CourierOption): void {
    this._selectedCourier.set(option);
  }


  createAuctionRequest(payload: CreateAuctionRequestPayload): void {
    this._loading.set(true);
    this._error.set(null);

    this.api.createAuctionRequest(payload).subscribe({
      next: (response) => {
        const entity = AuctionAssembler.toEntity(response);
        this._lastRequest.set(entity);
        this._loading.set(false);

        // cargamos couriers basados en el peso
        this.loadCouriers(payload.weightKg);
      },
      error: (err) => {
        console.error('Error creating auction request', err);
        this._error.set('auction.errors.createFailed');
        this._loading.set(false);
      }
    });
  }

}
