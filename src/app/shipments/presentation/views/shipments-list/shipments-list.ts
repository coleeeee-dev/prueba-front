import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-shipments-list',
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="p-4">
      <h1>Shipments</h1>
      <p>Placeholder de lista de envíos.</p>
    </mat-card>
  `
})
export class ShipmentsListComponent {}
