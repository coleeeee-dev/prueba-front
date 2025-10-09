// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

class SimpleTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideNoopAnimations(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: { provide: TranslateLoader, useClass: SimpleTranslateLoader, deps: [HttpClient] }
      })
    )
  ]
};
