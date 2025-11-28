// src/app/shipments/infrastructure/shipments-api.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { ShipmentBackendResponse } from './shipments-backend-response';

@Injectable({ providedIn: 'root' })
export class ShipmentsApi {

  private http = inject(HttpClient);

  // 👇 SIEMPRE apuntar al backend, NO a localhost:4200
  private readonly baseUrl = `${environment.apiBaseUrl}/shipments`;

  /**
   * Crear envío
   * POST https://.../api/v1/shipments
   */
  create(payload: any): Observable<ShipmentBackendResponse> {
    return this.http.post<ShipmentBackendResponse>(this.baseUrl, payload);
  }

  /**
   * Listar TODOS los envíos
   * GET https://.../api/v1/shipments
   */
  getAll(): Observable<ShipmentBackendResponse[]> {
    return this.http.get<ShipmentBackendResponse[]>(this.baseUrl);
  }

  /**
   * Listar últimos N envíos (si el backend no filtra,
   * cortamos en el front con slice).
   */
  listRecent(limit: number): Observable<ShipmentBackendResponse[]> {
    return this.http.get<ShipmentBackendResponse[]>(this.baseUrl, {
      params: new HttpParams().set('size', limit.toString())
    });
  }

  /**
   * Buscar por código de seguimiento.
   * Supongo que el backend filtra con ?trackingCode=...
   * (esto ya te funcionaba antes con el tracking).
   */
  getByCode(code: string): Observable<ShipmentBackendResponse[]> {
    const params = new HttpParams().set('trackingCode', code);
    return this.http.get<ShipmentBackendResponse[]>(this.baseUrl, { params });
  }
}
