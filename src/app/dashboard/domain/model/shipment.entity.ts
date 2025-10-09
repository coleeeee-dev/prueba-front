export type ShipmentStatus = 'in_transit' | 'delivered' | 'registered' | 'in_route';

export class Shipment {
  constructor(
    public code: string,
    public client: string,
    public destination: string,
    public status: ShipmentStatus,
    public dateISO: string             // '2024-01-15'
  ) {}
}
