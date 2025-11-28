// src/app/auth/application/auth.store.ts
import { computed, signal, type Signal, type WritableSignal } from '@angular/core';
import type { AuthUser } from '../infrastructure/auth-api';

// Signals internas
const userSignal = signal<AuthUser | null>(null);
const tokenSignal = signal<string | null>(null);
const isLoggedInSignal = computed<boolean>(() => !!userSignal());

// (Opcional) interfaz para el store
export interface AuthStore {
  user: WritableSignal<AuthUser | null>;
  token: WritableSignal<string | null>;
  isLoggedIn: Signal<boolean>;
  setUser(user: AuthUser): void;
  clearSession(): void;
  loadFromStorage(): void;
}

// Store público
export const authStore: AuthStore = {
  user: userSignal,
  token: tokenSignal,
  isLoggedIn: isLoggedInSignal,

  setUser(user: AuthUser): void {
    userSignal.set(user);

    // Token fake sólo para simular sesión
    const fakeToken = 'sendify-demo-token';
    tokenSignal.set(fakeToken);

    localStorage.setItem('sendify_user', JSON.stringify(user));
    localStorage.setItem('sendify_token', fakeToken);
  },

  clearSession(): void {
    userSignal.set(null);
    tokenSignal.set(null);
    localStorage.removeItem('sendify_user');
    localStorage.removeItem('sendify_token');
  },

  loadFromStorage(): void {
    try {
      const rawUser = localStorage.getItem('sendify_user');
      const rawToken = localStorage.getItem('sendify_token');

      if (rawUser && rawToken) {
        const parsedUser = JSON.parse(rawUser) as AuthUser;
        userSignal.set(parsedUser);
        tokenSignal.set(rawToken);
      }
    } catch {
      // Si algo falla leyendo/parsing, limpiamos
      userSignal.set(null);
      tokenSignal.set(null);
    }
  }
};
