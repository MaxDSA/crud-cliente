import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';


export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'];

  // Verifica se o usuário está autenticado e possui a role esperada
  if (authService.isAuthenticated() && authService.hasRole(expectedRole)) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};