export interface ShipmentResponse {
  id: number;
  code: string;
  client: string;
  destination: string;
  status: 'in_transit' | 'delivered' | 'registered' | 'in_route';
  dateISO: string;
}
