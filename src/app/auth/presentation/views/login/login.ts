// src/app/auth/presentation/views/login/login.ts
import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  // ====== Inyección (antes de usar en propiedades) ======
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  // Cambia aquí si prefieres otro logo
  logoUrl = 'https://files.catbox.moe/f3pdna.png';

  // Modo actual: 'login' o 'register'
  mode = signal<'login' | 'register'>('login');

  // ocultar/mostrar password
  hidePassLogin = signal(true);
  hidePassReg1  = signal(true);
  hidePassReg2  = signal(true);

  // Forms (ya podemos usar this.fb porque está inyectado arriba)
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required]]
  }, { validators: this.matchPasswords });

  // Textos dinámicos
  title = computed(() => this.mode() === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta');
  subtitle = computed(() => this.mode() === 'login' ? '¡Bienvenido!' : '');
  primaryCta = computed(() => this.mode() === 'login' ? 'Ingresar' : 'Registrarse');
  switchText = computed(() =>
    this.mode() === 'login' ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'
  );

  // Cambiar entre login / register
  switchMode() {
    this.mode.set(this.mode() === 'login' ? 'register' : 'login');
    this.loginForm.reset();
    this.registerForm.reset();
  }

  submit() {
    if (this.mode() === 'login') {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }
      // TODO: conectar con AuthStore/Api
      this.snack.open('¡Bienvenido a Sendify!', undefined, { duration: 1400 });
      this.router.navigateByUrl('/dashboard');
    } else {
      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        return;
      }
      // TODO: registrar usuario con API
      this.snack.open('Cuenta creada correctamente', undefined, { duration: 1400 });
      this.mode.set('login'); // o navegar al dashboard si prefieres
      // this.router.navigateByUrl('/dashboard');
    }
  }

  // Validador para confirmar contraseña
  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const p = group.get('password')?.value;
    const c = group.get('confirm')?.value;
    if (p && c && p !== c) {
      group.get('confirm')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  // helpers UI
  hasError(ctrl: AbstractControl | null, error: string) {
    return !!ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched) && ctrl.hasError(error);
  }
}
