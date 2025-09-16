import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FiltroClienteService } from '../../services/filtro-cliente.service';

@Component({
  selector: 'app-pesquisa-cliente',
  exportAs: 'app-pesquisa-cliente',
  imports: [MatInputModule],
  templateUrl: './pesquisa-cliente.component.html',
  styleUrl: './pesquisa-cliente.component.scss',
})
export class PesquisaClienteComponent {

  constructor(private service: FiltroClienteService) {}

  onInput(event: Event): void {    
    const inputElement = event.target as HTMLInputElement;
    this.service.atualizarTermoBusca(inputElement.value);
  }
}
