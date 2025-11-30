import { AuctionRequest } from '../domain/model/auction-request.entity';
import {
  AuctionRequestBackendResponse,
  CreateAuctionRequestPayload
} from './auction-request.response';

import { CourierOption } from '../domain/model/courier-option.entity';
import { CourierBackendResponse } from './auction-request.response';


export class AuctionAssembler {
  static toEntity(response: AuctionRequestBackendResponse): AuctionRequest {
    return {
      id: response.id,
      origin: response.origin,
      destination: response.destination,
      weightKg: response.weightKg,
      lengthCm: response.lengthCm,
      widthCm: response.widthCm,
      heightCm: response.heightCm,
      declaredValue: response.declaredValue,
      description: response.description,
      status: response.status,
      createdAt: response.createdAt
    };
  }

  /** Convierte el valor del formulario en el payload que espera el backend */
  static toCreatePayload(formValue: any): CreateAuctionRequestPayload {
    return {
      origin: formValue.origin,
      destination: formValue.destination,
      weightKg: Number(formValue.weightKg),
      lengthCm: Number(formValue.lengthCm),
      widthCm: Number(formValue.widthCm),
      heightCm: Number(formValue.heightCm),
      declaredValue: Number(formValue.declaredValue),
      description: formValue.description ?? null
    };
  }


  static toCourierOptions(
    responses: CourierBackendResponse[],
    weightKg: number
  ): CourierOption[] {
    // 1. Ordenamos por costPerKg de menor a mayor
    const sorted = [...responses].sort(
      (a, b) => (a.costPerKg ?? 0) - (b.costPerKg ?? 0)
    );

    // 2. Nos quedamos SOLO con los 3 más baratos
    const top3 = sorted.slice(0, 3);

    // 3. Calculamos el precio estimado
    return top3.map((r) => ({
      id: r.id,
      name: r.name,
      estimatedPrice: Number((r.costPerKg ?? 0) * weightKg),
      currency: r.currency,
      estimatedDeliveryDays: r.estimatedDeliveryDays
    }));
  }

}
