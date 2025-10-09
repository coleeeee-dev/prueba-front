import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Kpi } from '../../../domain/model/kpi.entity';

@Component({
  standalone: true,
  selector: 'app-kpi-card',
  imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './kpi-card.html',
  styleUrls: ['./kpi-card.css']
})
export class KpiCardComponent {
  @Input({ required: true }) kpi!: Kpi;
}
