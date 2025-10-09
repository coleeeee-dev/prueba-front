import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { KpiCardComponent } from '../../components/kpi-card/kpi-card';
import { QuickActionsComponent } from '../../components/quick-actions/quick-actions';
import { RecentShipmentsTableComponent } from '../../components/recent-shipments-table/recent-shipments-table';
import { EpicCardComponent } from '../../components/epic-card/epic-card';
import { LanguageSwitcherComponent } from '../../../../shared/presentation/components/language-switcher/language-switcher';

import { dashboardStore } from '../../../application/dashboard.store';
import { ShipmentsApi } from '../../../../shipments/infrastructure/shipments-api';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule, RouterModule, TranslateModule, MatCardModule,
    KpiCardComponent, QuickActionsComponent, RecentShipmentsTableComponent,
    EpicCardComponent, LanguageSwitcherComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  store = dashboardStore;
  private shipmentsApi = inject(ShipmentsApi);

  ngOnInit() {
    this.store.load(this.shipmentsApi);
  }
}
