// Respuesta que viene del backend (ShipmentResource de Spring)
export interface ContactInformationBackend {
  name: string;
  email: string;
  phone: string;
}

export interface AddressBackend {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
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
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  courierId: number;
  deliveryPersonId: string | null;
  estimatedDelivery: string | null; // LocalDate → string
  createdAt: string | null;         // Instant → string
  updatedAt: string | null;
}
