import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { PesquisaClienteComponent } from "../components/pesquisa-cliente/pesquisa-cliente.component";
import { ListaClienteComponent } from "../components/lista-cliente/lista-cliente.component";

@Component({
  selector: 'app-clientes',
  imports: [
    CommonModule,
    MatCardModule,
    PesquisaClienteComponent,
    ListaClienteComponent
],
  templateUrl: './clientes-page.component.html',
  styleUrls: ['./clientes-page.component.scss'],
})
export class ClientesPageComponent {

}
