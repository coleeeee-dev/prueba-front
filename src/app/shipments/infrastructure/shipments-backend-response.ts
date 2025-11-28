export interface ContactInformationBackend {
  name: string;
  contactEmail: string;
  contactPhone: string;
}

export interface AddressBackend {
  street: string;
  city: string;
  country: string;
  postalCode?: string | null;
}

export interface ShipmentBackendResponse {
  id: number;
  trackingCode: string;
  sender: ContactInformationBackend;
  recipient: ContactInformationBackend;
  originAddress: AddressBackend;
  destinationAddress: AddressBackend;
  weight: number;
  cost: number;
  status: string;
  courierId: number;
  deliveryPersonId?: string | null;
  estimatedDelivery?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  // ✅ Opcional, para que no truene el type-checking cuando en track.ts
  // haces (row.events as TrackEvent[] ?? [])
  events?: {
    status: string;
    description: string;
    location: string;
    timestamp: string;
  }[];
}
