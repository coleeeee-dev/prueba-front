import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-epic-card',
  imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './epic-card.html',
  styleUrls: ['./epic-card.css']
})
export class EpicCardComponent {
  @Input({ required: true }) icon = 'insights';
  @Input({ required: true }) titleKey!: string;
  @Input({ required: true }) lines: string[] = [];
}
