export interface AuctionRequest {
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
