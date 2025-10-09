import { signal } from '@angular/core';
import { Kpi } from '../domain/model/kpi.entity';
import { Shipment } from '../../shipments/domain/model/shipment.entity';
import { ShipmentsApi } from '../../shipments/infrastructure/shipments-api';
import { ShipmentsAssembler } from '../../shipments/infrastructure/shipments-assembler';

export const dashboardStore = {
  loading: signal(false),
  kpis: signal<Kpi[]>([]),
  recentShipments: signal<Shipment[]>([]),

  load(api: ShipmentsApi) {
    this.loading.set(true);

    // KPIs mock
    this.kpis.set([
      new Kpi('Envíos Activos', 47, 12, 'local_shipping'),
      new Kpi('En Tránsito', 23, 5, 'route'),
      new Kpi('Entregados Hoy', 15, 18, 'task_alt'),
      new Kpi('Alertas Pendientes', 3, -25, 'warning')
    ]);

    // Fake API
    api.listRecent(4).subscribe({
      next: (resp) => this.recentShipments.set(ShipmentsAssembler.toEntityList(resp)),
      error: () => this.recentShipments.set([]),
      complete: () => this.loading.set(false)
    });
  }
};
