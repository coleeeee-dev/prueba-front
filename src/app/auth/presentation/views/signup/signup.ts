import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../infrastructure/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email ?? '';

    const result = this.auth.register(email);
    if (!result.ok) {
      if (result.reason === 'exists') {
        this.errorMessage = 'Este correo ya tiene una cuenta en SENDIFY.';
      } else {
        this.errorMessage = 'Correo inválido.';
      }
      return;
    }

    // Si se creó bien, lo logueamos y mandamos al dashboard
    this.auth.login(email);
    this.successMessage = 'Cuenta creada correctamente. Redirigiendo…';
    this.router.navigateByUrl('/dashboard');
  }
}
