import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-language-switcher',
  imports: [CommonModule, MatButtonToggleModule],
  templateUrl: './language-switcher.html',
  styleUrls: ['./language-switcher.css']
})
export class LanguageSwitcherComponent implements OnInit {
  private i18n = inject(TranslateService);
  lang = signal<'es' | 'en'>('es');

  ngOnInit() {
    const saved = (localStorage.getItem('lang') as 'es' | 'en') || 'es';
    this.setLang(saved);
  }

  setLang(code: 'es' | 'en') {
    this.lang.set(code);
    this.i18n.use(code);
    localStorage.setItem('lang', code);
  }
}
