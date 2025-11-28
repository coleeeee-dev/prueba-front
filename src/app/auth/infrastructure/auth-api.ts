// src/app/auth/infrastructure/auth-api.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

// payload que espera el backend para crear usuario
export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  /**
   * Crear usuario en /users
   * (lo usamos desde "Crear cuenta")
   */
  createUser(email: string): Observable<AuthUser> {
    const nameFromEmail = email.split('@')[0] || 'Usuario SENDIFY';

    const body: CreateUserRequest = {
      email,
      password: '123456',        // contraseña por defecto (no la usamos aún en el login)
      name: nameFromEmail,
      phone: '999999999',        // placeholder para que pase la validación
      role: 'ADMIN'              // o 'USER' si prefieres
    };

    return this.http.post<AuthUser>(
      `${this.baseUrl}/users`,
      body
    );
  }

  /**
   * Login "simplificado": solo valida que exista el email en /users.
   * GET /users?email=xxx
   */
  getUserByEmail(email: string): Observable<AuthUser | null> {
    const params = new HttpParams().set('email', email);

    return this.http
      .get<AuthUser[]>(`${this.baseUrl}/users`, { params })
      .pipe(
        map(list => (list && list.length > 0 ? list[0] : null))
      );
  }
}
