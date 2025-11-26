// src/app/shipments/infrastructure/shipments-api.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ShipmentsApiEndpoint } from './shipments-api-endpoint';
import { ShipmentBackendResponse } from './shipments-backend-response';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShipmentsApi {
  private http = inject(HttpClient);

  // https://TU_BACKEND_RAILWAY/api/v1 + /shipments = /api/v1/shipments
  private readonly base = environment.apiBaseUrl + ShipmentsApiEndpoint.base;

  /**
   * Lista de envíos recientes para el dashboard.
   * Traemos todos del backend, ordenamos por fecha y nos quedamos con los primeros N.
   */
  listRecent(limit = 4): Observable<ShipmentBackendResponse[]> {
    return this.http.get<ShipmentBackendResponse[]>(this.base).pipe(
      map(list =>
        [...list] // copiamos para no mutar la respuesta original
          .sort((a, b) => {
            const da = (a.createdAt ?? a.estimatedDelivery ?? '').toString();
            const db = (b.createdAt ?? b.estimatedDelivery ?? '').toString();
            return new Date(db).getTime() - new Date(da).getTime();
          })
          .slice(0, limit)
      )
    );
  }

  /**
   * Buscar por código de tracking (pantalla Tracking).
   * El backend aún no tiene endpoint específico, así que filtramos en el front.
   */
  getByCode(code: string): Observable<ShipmentBackendResponse[]> {
    return this.http.get<ShipmentBackendResponse[]>(this.base).pipe(
      map(list => list.filter(s => s.trackingCode === code))
    );
  }

  /**
   * Crear envío.
   * OJO: aquí esperamos que el payload tenga la forma del CreateShipmentResource del backend.
   * Más adelante podemos pulir el tipo; por ahora usamos any para no pelear con TS.
   */
  create(payload: any): Observable<ShipmentBackendResponse> {
    return this.http.post<ShipmentBackendResponse>(this.base, payload);
  }
}
