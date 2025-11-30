export interface AuctionRequestBackendResponse {
  id: number;
  origin: string;
  destination: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  declaredValue: number;
  description?: string | null;
  status: string;
  createdAt: string;
}

/** Payload que manda el front al backend (POST) */
export interface CreateAuctionRequestPayload {
  origin: string;
  destination: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  declaredValue: number;
  description?: string | null;
}

export interface CourierBackendResponse {
  id: number;
  name: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  costPerKg: number;
  currency: string;
  estimatedDeliveryDays: number;
}

