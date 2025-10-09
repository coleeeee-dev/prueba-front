// src/app/shipments/infrastructure/shipments-api.ts
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ShipmentResponse } from './shipments-response';
import { ShipmentsApiEndpoint } from './shipments-api-endpoint';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ShipmentsApi {
  private http = inject(HttpClient);
  private readonly base =
  (environment as any).apiBase ??
  (environment as any).apiBaseUrl ??
  'http://localhost:4000';


  listRecent(limit = 4) {
    const url = this.base + ShipmentsApiEndpoint.recent(limit);
    return this.http.get<ShipmentResponse[]>(url);
  }

  create(payload: ShipmentResponse) {
    const url = this.base + ShipmentsApiEndpoint.base;
    return this.http.post<ShipmentResponse>(url, payload);
  }

  getByCode(code: string): Observable<any[]> {
    const params = new HttpParams().set('code', code);
    return this.http.get<any[]>(`${this.base}/shipments`, { params });
  }


}
