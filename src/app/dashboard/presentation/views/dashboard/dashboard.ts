// src/app/dashboard/presentation/views/dashboard/dashboard.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions';
import { RecentShipmentsTableComponent } from '../../components/recent-shipments-table/recent-shipments-table';
import { EpicCardComponent } from '../../components/epic-card/epic-card';
import { LanguageSwitcherComponent } from '../../../../shared/presentation/components/language-switcher/language-switcher';

import { dashboardStore } from '../../../application/dashboard.store';
import { ShipmentsApi } from '../../../../shipments/infrastructure/shipments-api';
import { authStore } from '../../../../auth/application/auth.store';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    TranslateModule,
    KpiCardComponent,
    QuickActionsComponent,
    RecentShipmentsTableComponent,
    EpicCardComponent,
    LanguageSwitcherComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  store = dashboardStore;
  auth = authStore;

  private shipmentsApi = inject(ShipmentsApi);
  private router = inject(Router);

  ngOnInit(): void {
    // 👇 aquí pasamos la API al store, así se corrige el TS2554
    this.store.load(this.shipmentsApi);
  }

  onLogout(): void {
    // limpiamos sesión y volvemos al login
    this.auth.clearSession();
    this.router.navigateByUrl('/login');
  }
}
