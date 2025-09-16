import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltroClienteService {
  private termoBuscaSubject = new Subject<string>();
  termoBusca$ = this.termoBuscaSubject.asObservable();

  atualizarTermoBusca(termo: string): void {
    this.termoBuscaSubject.next(termo);
  }
}