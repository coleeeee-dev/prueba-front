// src/app/notifications/presentation/views/notifications-list/notifications-list.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { NotificationsStore } from '../../../application/notifications.store';

@Component({
  standalone: true,
  selector: 'app-notifications-list',
  imports: [
    CommonModule, RouterModule, FormsModule,
    MatIconModule, MatButtonModule, MatButtonToggleModule, MatMenuModule,
    MatSlideToggleModule, MatChipsModule, MatCardModule, MatDividerModule
  ],
  templateUrl: './notifications-list.html',
  styleUrls: ['./notifications-list.css']
})
export class NotificationsListComponent {
  tab = signal<'inbox'|'config'>('inbox');

  // toggles de config (mock local)
  cfgEmail   = signal(true);
  cfgWhats   = signal(true);
  cfgDelay   = signal(true);
  cfgConfirm = signal(true);
  cfgStatus  = signal(false);

  constructor(public store: NotificationsStore) {
    this.store.load();
  }

  setTab(value: 'inbox'|'config') { this.tab.set(value); }

  unread = computed(() => this.store.unreadCount());

  chipClass(sev: 'high'|'medium'|'low') {
    return { 'high': 'sev-high', 'medium': 'sev-med', 'low': 'sev-low' }[sev];
  }
}
