import { Shipment } from '../domain/model/shipment.entity';
import { ShipmentBackendResponse } from './shipments-backend-response';

export class ShipmentsAssembler {

  static toEntity(r: ShipmentBackendResponse): Shipment {
    const code = r.trackingCode;

    // mostramos al destinatario como "cliente" en el dashboard
    const client =
      r.recipient?.name ??
      r.sender?.name ??
      'Cliente';

    const destination = r.destinationAddress
      ? `${r.destinationAddress.city}, ${r.destinationAddress.country}`
      : 'Destino';

    const statusMap: Record<string, Shipment['status']> = {
      PENDING: 'registered',
      IN_TRANSIT: 'in_transit',
      DELIVERED: 'delivered',
      CANCELLED: 'in_route'
    };

    const status = statusMap[r.status] ?? 'registered';

    const dateISO =
      r.createdAt ??
      r.estimatedDelivery ??
      new Date().toISOString();

    return new Shipment(code, client, destination, status, dateISO);
  }

  static toEntityList(r: ShipmentBackendResponse[]): Shipment[] {
    return r.map(this.toEntity);
  }
}
