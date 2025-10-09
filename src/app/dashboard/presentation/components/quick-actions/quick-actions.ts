import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-quick-actions',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './quick-actions.html',
  styleUrls: ['./quick-actions.css']
})
export class QuickActionsComponent {}
