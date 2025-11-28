// src/app/auth/infrastructure/users-api.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

// Ajusta esto a lo que devuelve tu backend realmente
export interface UserBackendResponse {
  id: number;
  email: string;
  fullName?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersApi {

  private http = inject(HttpClient);
  // ej: https://sendify-backend-open-production.up.railway.app/api/v1
  private baseUrl = `${environment.apiBaseUrl}/users`;

  /**
   * Busca un usuario por email.
   * Devuelve el usuario o null si no existe.
   */
  findByEmail(email: string): Observable<UserBackendResponse | null> {
    const params = new HttpParams().set('email', email);

    return this.http
      .get<UserBackendResponse[]>(this.baseUrl, { params })
      .pipe(
        map(list => (Array.isArray(list) && list.length > 0 ? list[0] : null))
      );
  }
}
