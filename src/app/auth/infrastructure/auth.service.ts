import { Injectable, computed, signal } from '@angular/core';

const USERS_KEY = 'sfy-users';
const CURRENT_KEY = 'sfy-email';
const DEFAULT_ADMIN = 'admin@sendify.pe'; // usuario sembrado por defecto

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersSignal = signal<string[]>(this.loadUsers());
  private emailSignal = signal<string | null>(
    localStorage.getItem(CURRENT_KEY)
  );

  // Para mostrar el correo logueado si luego quieres
  email = computed(() => this.emailSignal());
  users = computed(() => this.usersSignal());

  // Cargar usuarios desde localStorage (y sembrar uno por defecto)
  private loadUsers(): string[] {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed as string[];
        }
      } catch {
        // ignore
      }
    }
    // si no hay nada, sembramos el admin por defecto
    const seed = [DEFAULT_ADMIN.toLowerCase()];
    localStorage.setItem(USERS_KEY, JSON.stringify(seed));
    return seed;
  }

  private saveUsers(list: string[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(list));
    this.usersSignal.set(list);
  }

  isLoggedIn(): boolean {
    return !!this.emailSignal();
  }

  /**
   * Login: solo permite entrar si el correo existe en la "tabla" local
   */
  login(emailRaw: string): boolean {
    const email = emailRaw.trim().toLowerCase();
    const exists = this.usersSignal().includes(email);
    if (!exists) return false;

    this.emailSignal.set(email);
    localStorage.setItem(CURRENT_KEY, email);
    return true;
  }

  /**
   * Registro: crea un nuevo usuario si no existe
   * devuelve:
   *  - { ok: true } si se creó
   *  - { ok: false, reason: 'exists' | 'invalid' } si falla
   */
  register(emailRaw: string): { ok: boolean; reason?: 'exists' | 'invalid' } {
    const email = emailRaw.trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return { ok: false, reason: 'invalid' };
    }

    const list = this.usersSignal();
    if (list.includes(email)) {
      return { ok: false, reason: 'exists' };
    }

    const updated = [...list, email];
    this.saveUsers(updated);
    return { ok: true };
  }

  logout(): void {
    this.emailSignal.set(null);
    localStorage.removeItem(CURRENT_KEY);
  }
}
