// src/app/shipments/presentation/views/shipments-list/shipments-list.ts
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { ShipmentsApi } from '../../../infrastructure/shipments-api';
import { ShipmentBackendResponse } from '../../../infrastructure/shipments-backend-response';

interface ShipmentRow {
  id: number | null;
  code: string;
  client: string;
  destination: string;
  status: string;
  createdAt?: string | null;
}

@Component({
  standalone: true,
  selector: 'app-shipments-list',
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatChipsModule
  ],
  template: `
    <section class="page">
      <div class="page-header">
        <h1 class="page-title">Envíos</h1>

        <button mat-raised-button color="primary" [routerLink]="['/shipments/new']">
          Crear nuevo envío
        </button>
      </div>

      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Envíos registrados</mat-card-title>
          <mat-card-subtitle>
            Lista general de envíos creados desde el dashboard o vía API.
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          @if (loading()) {
            <div class="state-text">Cargando envíos…</div>
          } @else if (error()) {
            <div class="state-text error">
              Ocurrió un error al cargar los envíos.
            </div>
          } @else if (rows().length === 0) {
            <div class="state-text">Todavía no hay envíos registrados.</div>
          } @else {
            <div class="table-wrapper">
              <table class="shipments-table">
                <thead>
                <tr>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Destino</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
                </thead>
                <tbody>
                  @for (s of rows(); track s.id) {
                    <tr>
                      <td class="mono">{{ s.code }}</td>
                      <td>{{ s.client }}</td>
                      <td>{{ s.destination }}</td>
                      <td>
                        <mat-chip [ngClass]="statusClass(s.status)">
                          {{ s.status }}
                        </mat-chip>
                      </td>
                      <td>{{ s.createdAt | date: 'short' }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </mat-card-content>
      </mat-card>
    </section>
  `,
  styles: [`
    .page {
      padding: 24px;
      color: #fff;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .page-title {
      font-size: 22px;
      font-weight: 600;
      margin: 0;
    }
    .card {
      background: #111;
      color: #fff;
    }
    .state-text {
      padding: 16px 0;
      font-size: 14px;
    }
    .state-text.error {
      color: #ff6b6b;
    }
    .table-wrapper {
      width: 100%;
      overflow-x: auto;
      margin-top: 8px;
    }
    .shipments-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .shipments-table th,
    .shipments-table td {
      padding: 8px 12px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      text-align: left;
    }
    .shipments-table th {
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .mono {
      font-family: "JetBrains Mono", "Fira Code", monospace;
    }
    .status-chip {
      font-size: 11px;
      text-transform: uppercase;
    }
    .status-registered {
      background: rgba(255, 193, 7, 0.15);
      color: #ffc107;
    }
    .status-in-transit {
      background: rgba(33, 150, 243, 0.15);
      color: #29b6f6;
    }
    .status-out-for-delivery {
      background: rgba(156, 39, 176, 0.15);
      color: #e040fb;
    }
    .status-delivered {
      background: rgba(76, 175, 80, 0.15);
      color: #66bb6a;
    }
  `]
})
export class ShipmentsListComponent implements OnInit {

  private api = inject(ShipmentsApi);

  loading = signal(true);
  error = signal(false);
  rows = signal<ShipmentRow[]>([]);

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(false);

    // 🔹 usamos getAll() que sí existe en ShipmentsApi
    this.api.getAll().subscribe({
      next: (list: ShipmentBackendResponse[]) => {
        const mapped = list.map(s => this.mapToRow(s));
        this.rows.set(mapped);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error(err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  private mapToRow(s: ShipmentBackendResponse): ShipmentRow {
    return {
      id: (s as any).id ?? null,
      code: (s as any).trackingCode ?? (s as any).code ?? '—',
      client: (s as any).senderName ?? (s as any).sender?.name ?? '—',
      destination: (s as any).destinationCity ?? (s as any).destination?.city ?? '—',
      status: (s as any).status ?? 'REGISTERED',
      createdAt: (s as any).createdAt ?? null
    };
  }

  statusClass(status: string): string {
    const s = (status || '').toUpperCase();
    if (s === 'IN_TRANSIT') return 'status-in-transit status-chip';
    if (s === 'OUT_FOR_DELIVERY') return 'status-out-for-delivery status-chip';
    if (s === 'DELIVERED') return 'status-delivered status-chip';
    return 'status-registered status-chip';
  }
}
