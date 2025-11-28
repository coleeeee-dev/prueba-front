// src/app/dashboard/application/dashboard.store.ts
import { signal } from '@angular/core';
import { Kpi } from '../domain/model/kpi.entity';
import { Shipment } from '../../shipments/domain/model/shipment.entity';
import { ShipmentsApi } from '../../shipments/infrastructure/shipments-api';
import { ShipmentsAssembler } from '../../shipments/infrastructure/shipments-assembler';
import { ShipmentBackendResponse } from '../../shipments/infrastructure/shipments-backend-response';

export const dashboardStore = {
  loading: signal(false),
  kpis: signal<Kpi[]>([]),
  recentShipments: signal<Shipment[]>([]),

  load(api: ShipmentsApi) {
    this.loading.set(true);

    // KPIs mock (igual que antes)
    this.kpis.set([
      new Kpi('Envíos Activos', 47, 12, 'local_shipping'),
      new Kpi('En Tránsito', 23, 5, 'route'),
      new Kpi('Entregados Hoy', 15, 18, 'task_alt'),
      new Kpi('Alertas Pendientes', 3, -25, 'warning')
    ]);

    api.getAll().subscribe({
      next: (resp: ShipmentBackendResponse[]) => {
        const entities = ShipmentsAssembler.toEntityList(resp);
        // 👇 solo mostramos los últimos 5 en el dashboard
        this.recentShipments.set(entities.slice(0, 5));
        this.loading.set(false);
      },
      error: () => {
        this.recentShipments.set([]);
        this.loading.set(false);
      }
    });
  }
};
