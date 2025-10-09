// src/app/notifications/infrastructure/notifications-api.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type Severity = 'high' | 'medium' | 'low';
export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  code: string;
  dateISO: string;
  severity: Severity;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationsApi {
  private base = environment.apiBaseUrl + '/notifications';

  constructor(private http: HttpClient) {}

  list() {
    // más recientes primero
    return this.http.get<NotificationItem[]>(`${this.base}?_sort=dateISO&_order=desc`);
  }

  markRead(id: number) {
    return this.http.patch<NotificationItem>(`${this.base}/${id}`, { read: true });
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  markAllRead(ids: number[]) {
    // json-server no soporta bulk; hacemos varias PATCH en paralelo en la store
    return ids.map(id => this.markRead(id));
  }
}
