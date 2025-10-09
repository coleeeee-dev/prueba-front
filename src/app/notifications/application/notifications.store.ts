// src/app/notifications/application/notifications.store.ts
import { Injectable, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NotificationsApi, NotificationItem } from '../infrastructure/notifications-api';

@Injectable({ providedIn: 'root' })
export class NotificationsStore {
  list = signal<NotificationItem[]>([]);
  loading = signal(false);

  constructor(private api: NotificationsApi) {}

  load() {
    this.loading.set(true);
    this.api.list().subscribe({
      next: data => this.list.set(data),
      complete: () => this.loading.set(false)
    });
  }

  unreadCount() {
    return this.list().filter(n => !n.read).length;
  }

  markRead(id: number) {
    this.api.markRead(id).subscribe(() => {
      this.list.update(arr => arr.map(n => (n.id === id ? { ...n, read: true } : n)));
    });
  }

  markAllRead() {
    const ids = this.list().filter(n => !n.read).map(n => n.id);
    if (!ids.length) return;
    forkJoin(this.api.markAllRead(ids)).subscribe(() => {
      this.list.update(arr => arr.map(n => ({ ...n, read: true })));
    });
  }

  remove(id: number) {
    this.api.remove(id).subscribe(() => {
      this.list.update(arr => arr.filter(n => n.id !== id));
    });
  }
}
