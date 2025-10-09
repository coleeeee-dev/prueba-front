import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  imports: [CommonModule],
  template: `
    <div style="padding:24px">
      <h2>404</h2>
      <p>Página no encontrada.</p>
    </div>
  `
})
export class PageNotFoundComponent {}
