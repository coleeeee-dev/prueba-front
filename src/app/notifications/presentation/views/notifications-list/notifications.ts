import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';


type NotificationType = 'shipment' | 'auction' | 'system';

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string; // texto tipo "Hace 2 horas" o fecha
  read: boolean;
}

interface NotificationSettings {
  email: boolean;
  inApp: boolean;
  sms: boolean;
  criticalOnly: boolean;
}

@Component({
  standalone: true,
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrls: ['./notifications.css'],
  imports: [
    CommonModule,
    RouterModule,          // 👈 nuevo
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatChipsModule
  ]
})
export class NotificationsComponent implements OnInit {
  // 'notifications' | 'settings'
  activeTab: 'notifications' | 'settings' = 'notifications';

  notifications: NotificationItem[] = [
    {
      id: 1,
      title: 'New shipment registered',
      message: 'Shipment SFY294246832 has been created successfully.',
      type: 'shipment',
      createdAt: '5 min ago',
      read: false
    },
    {
      id: 2,
      title: 'Shipment in transit',
      message: 'Shipment SFY759669926 is now in transit to Arequipa, Peru.',
      type: 'shipment',
      createdAt: '1 hour ago',
      read: false
    },
    {
      id: 3,
      title: 'Auction published',
      message:
        'Your shipment auction Lima → Cusco is now visible to couriers.',
      type: 'auction',
      createdAt: 'Yesterday',
      read: true
    },
    {
      id: 4,
      title: 'System maintenance',
      message:
        'Sendify will have a brief maintenance window tonight at 02:00 AM.',
      type: 'system',
      createdAt: '2 days ago',
      read: true
    }
  ];

  settings: NotificationSettings = {
    email: true,
    inApp: true,
    sms: false,
    criticalOnly: false
  };

  private readonly STORAGE_KEY_SETTINGS = 'sendify.notificationSettings';
  private readonly STORAGE_KEY_NOTIFICATIONS = 'sendify.notifications.v1';

  ngOnInit(): void {
    this.loadFromStorage();
  }

  // ==== Tabs ====

  setTab(tab: 'notifications' | 'settings'): void {
    this.activeTab = tab;
  }

  // ==== Notificaciones ====

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  markAsRead(notification: NotificationItem): void {
    if (notification.read) return;
    notification.read = true;
    this.saveNotifications();
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map((n) => ({
      ...n,
      read: true
    }));
    this.saveNotifications();
  }

  clearAll(): void {
    this.notifications = [];
    this.saveNotifications();
  }

  // ==== Configuración ====

  toggleSetting(key: keyof NotificationSettings): void {
    this.settings = { ...this.settings, [key]: !this.settings[key] };
    this.saveSettings();
  }

  // ==== Persistencia en localStorage (opcional) ====

  private loadFromStorage(): void {
    try {
      const rawSettings = localStorage.getItem(this.STORAGE_KEY_SETTINGS);
      if (rawSettings) {
        this.settings = { ...this.settings, ...JSON.parse(rawSettings) };
      }

      const rawNotifications = localStorage.getItem(
        this.STORAGE_KEY_NOTIFICATIONS
      );
      if (rawNotifications) {
        const parsed = JSON.parse(rawNotifications) as NotificationItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.notifications = parsed;
        }
      }
    } catch {
      // si algo falla con localStorage, seguimos con los valores por defecto
    }
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY_SETTINGS,
        JSON.stringify(this.settings)
      );
    } catch {
      // ignore
    }
  }

  private saveNotifications(): void {
    try {
      localStorage.setItem(
        this.STORAGE_KEY_NOTIFICATIONS,
        JSON.stringify(this.notifications)
      );
    } catch {
      // ignore
    }
  }
}
