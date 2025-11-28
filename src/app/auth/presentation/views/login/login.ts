// src/app/auth/presentation/views/login/login.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TranslateModule } from '@ngx-translate/core';

import { AuthApi, AuthUser } from '../../../infrastructure/auth-api';
import { authStore } from '../../../application/auth.store';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ]
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private api = inject(AuthApi);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  loading = false;
  errorMessage = '';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawEmail = this.form.value.email ?? '';
    const email = rawEmail.trim();
    if (!email) { return; }

    this.loading = true;
    this.errorMessage = '';

    this.api.getUserByEmail(email).subscribe({
      next: (user: AuthUser | null) => {
        this.loading = false;

        if (!user) {
          this.errorMessage = 'Credenciales inválidas o usuario no registrado';
          return;
        }

        // Guardamos sesión en el store (y localStorage)
        authStore.setUser(user);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err: unknown) => {
        console.error(err);
        this.loading = false;
        this.errorMessage = 'Ocurrió un error validando el usuario';
      }
    });
  }

  goToCreate(): void {
    // ruta que estés usando para crear cuenta
    this.router.navigateByUrl('/auth/create');
  }
}
