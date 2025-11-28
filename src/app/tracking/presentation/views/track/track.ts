// src/app/tracking/presentation/views/track/track.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { finalize } from 'rxjs/operators';

import { ShipmentsApi } from '../../../../shipments/infrastructure/shipments-api';

type TrackEventType =
  | 'registered'
  | 'picked_up'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered';

type TrackEvent = {
  ts: string;
  type: TrackEventType;
  city: string;
  desc: string;
};

@Component({
  standalone: true,
  selector: 'app-track',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './track.html',
  styleUrls: ['./track.css']
})
export class TrackComponent {
  private api = inject(ShipmentsApi);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(3)]]
  });

  loading = signal(false);
  notFound = signal(false);
  data = signal<any | null>(null);
  events = signal<TrackEvent[]>([]);
  progress = signal(0);

  search(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const code = (this.form.value.code ?? '').trim();
    if (!code) return;

    this.loading.set(true);
    this.notFound.set(false);
    this.data.set(null);
    this.events.set([]);
    this.progress.set(0);

    this.api
      .getByCode(code)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (rows: any) => {
          let row: any = null;

          if (Array.isArray(rows)) {
            row =
              rows.find(
                (r: any) =>
                  r?.trackingCode === code ||
                  r?.code === code
              ) ?? null;
          } else {
            row = rows;
          }

          if (!row) {
            this.notFound.set(true);
            return;
          }

          const evs =
            ((row as any).events as TrackEvent[] | undefined ?? [])
              .slice()
              .sort((a, b) => a.ts.localeCompare(b.ts));

          const statusRaw =
            (row as any).status?.toString().toLowerCase() ?? 'registered';

          this.data.set({
            code: row.trackingCode ?? row.code ?? code,
            sender: row.senderName ?? row.sender?.name ?? '—',
            recipient: row.recipientName ?? row.recipient?.name ?? '—',
            destination:
              row.destinationCity ??
              row.destinationAddress?.city ??
              '—',
            courier: row.courierName ?? 'Courier #1',
            status: statusRaw,
            createdAt: row.createdAt ?? null
          });

          this.events.set(evs);
          this.progress.set(this.computeProgress(statusRaw));
        },
        error: () => {
          this.notFound.set(true);
        }
      });
  }

  private computeProgress(status: string): number {
    const s = status.toLowerCase();
    switch (s) {
      case 'registered':
        return 15;
      case 'picked_up':
        return 35;
      case 'in_transit':
        return 60;
      case 'out_for_delivery':
        return 80;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  }

  statusChipClass(status: string): string {
    const s = status.toLowerCase();
    return (
      {
        in_transit: 'in_transit',
        delivered: 'delivered',
        registered: 'registered',
        out_for_delivery: 'in_route'
      }[s] ?? 'registered'
    );
  }
}
