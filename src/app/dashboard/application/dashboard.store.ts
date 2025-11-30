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

    api.getAll().subscribe({
      next: (resp: ShipmentBackendResponse[]) => {
        const entities = ShipmentsAssembler.toEntityList(resp);

        // === Cálculo de KPIs ===
        const activeCount = entities.filter(
          s => s.status !== 'delivered'
        ).length;

        const inTransitCount = entities.filter(
          s => s.status === 'in_transit'
        ).length;

        const deliveredCount = entities.filter(
          s => s.status === 'delivered'
        ).length;

        // Por ahora dejamos cambios (%) mockeados
        const kpis: Kpi[] = [
          new Kpi('Envíos Activos', activeCount, 12, 'local_shipping'),
          new Kpi('En Tránsito', inTransitCount, 5, 'travel_explore'),
          new Kpi('Entregados', deliveredCount, 18, 'check_circle'),
          new Kpi('Alertas Pendientes', 0, -25, 'warning')
        ];

        this.kpis.set(kpis);

        // Solo mostramos los últimos 5 en el dashboard
        this.recentShipments.set(entities.slice(0, 5));

        this.loading.set(false);
      },
      error: () => {
        this.kpis.set([]);
        this.recentShipments.set([]);
        this.loading.set(false);
      }
    });
  }
};
