import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface TrackingEventBackendResponse {
  id: number;
  shipmentId: number;
  type: string;
  description: string;
  location: string;
  occurredAt: string;
}

@Injectable({ providedIn: 'root' })
export class TrackingApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}/tracking-events`;

  /**
   * GET /api/v1/tracking-events?shipmentId=ID
   */
  getByShipmentId(shipmentId: number): Observable<TrackingEventBackendResponse[]> {
    const params = new HttpParams().set('shipmentId', shipmentId.toString());
    return this.http.get<TrackingEventBackendResponse[]>(this.baseUrl, { params });
  }
}
