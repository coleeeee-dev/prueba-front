import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  AuctionRequestBackendResponse,
  CreateAuctionRequestPayload
} from './auction-request.response';
import { Observable } from 'rxjs';
import { CourierBackendResponse } from './auction-request.response';


@Injectable({
  providedIn: 'root'
})
export class AuctionApi {
  private readonly baseUrl = `${environment.apiBaseUrl}/auction-requests`;

  constructor(private http: HttpClient) {}

  createAuctionRequest(
    payload: CreateAuctionRequestPayload
  ): Observable<AuctionRequestBackendResponse> {
    return this.http.post<AuctionRequestBackendResponse>(
      this.baseUrl,
      payload
    );
  }

  getCouriers() {
    return this.http.get<CourierBackendResponse[]>(
      `${environment.apiBaseUrl}/couriers`
    );
  }



  getAllAuctionRequests(): Observable<AuctionRequestBackendResponse[]> {
    return this.http.get<AuctionRequestBackendResponse[]>(this.baseUrl);
  }
}
