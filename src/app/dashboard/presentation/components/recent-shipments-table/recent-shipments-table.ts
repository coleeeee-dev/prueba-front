import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { Shipment } from '../../../../shipments/domain/model/shipment.entity';  // <- este path

@Component({
  standalone: true,
  selector: 'app-recent-shipments-table',
  imports: [CommonModule, MatTableModule, MatChipsModule, TranslateModule, DatePipe],
  templateUrl: './recent-shipments-table.html',
  styleUrls: ['./recent-shipments-table.css']
})
export class RecentShipmentsTableComponent {
  @Input({ required: true }) data: Shipment[] = [];

  displayed = ['code','client','destination','status','date'];

  statusLabel(s: Shipment['status']) {
    switch (s) {
      case 'in_transit': return 'shipment.status.in_transit';
      case 'delivered':  return 'shipment.status.delivered';
      case 'registered': return 'shipment.status.registered';
      case 'in_route':   return 'shipment.status.in_route';
    }
  }
}
