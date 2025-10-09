import { ShipmentResponse } from './shipments-response';
import { Shipment } from '../domain/model/shipment.entity';

export class ShipmentsAssembler {
  static toEntity(r: ShipmentResponse): Shipment {
    return new Shipment(r.code, r.client, r.destination, r.status, r.dateISO);
  }
  static toEntityList(r: ShipmentResponse[]): Shipment[] {
    return r.map(this.toEntity);
  }
}
