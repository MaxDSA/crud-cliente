import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/clientes/pages/clientes-page.component').then(
        (m) => m.ClientesPageComponent
      ),
  },
  {
    path: 'clientes',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/clientes/pages/clientes-page.component').then(
        (m) => m.ClientesPageComponent
      ),
  },
];
