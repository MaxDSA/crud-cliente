import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/clientes/pages/clientes-page.component').then(m => m.ClientesPageComponent) },
    { path: 'clientes', loadComponent: () => import('./features/clientes/pages/clientes-page.component').then(m => m.ClientesPageComponent) },
    { path: 'formulario', loadComponent: () => import('./features/formulario-clientes/pages/formulario-clientes-page/formulario-clientes-page.component').then(m => m.FormularioClientesPageComponent) },
];
