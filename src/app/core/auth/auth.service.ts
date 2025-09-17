import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser = typeof window !== 'undefined' && !!window.localStorage;

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router) {
    if (this.isBrowser) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  get currentUser$(): Observable<Usuario | null> {
    return this.currentUserSubject.asObservable();
  }

  get currentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): boolean {
    // Mock de usuários para simulação
    if (email === 'admin' && password === '1234') {
      const user: Usuario = {
        id: 1,
        nome: 'Admin',
        email,
        role: 'admin',
        token: 'jwt-token-admin',
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }

    if (email === 'user' && password === '1234') {
      const user: Usuario = {
        id: 2,
        nome: 'User',
        email,
        role: 'user',
        token: 'jwt-token-user',
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  hasRole(role: string): boolean {
    return this.currentUser?.role === role;
  }
}
