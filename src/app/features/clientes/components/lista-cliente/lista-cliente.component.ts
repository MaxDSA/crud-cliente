import { AfterViewInit, Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../../../../core/models/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FiltroClienteService } from '../../services/filtro-cliente.service';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-lista-cliente',
  exportAs: 'app-lista-cliente',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatIconButton
  ],
  templateUrl: './lista-cliente.component.html',
  styleUrl: './lista-cliente.component.scss',
})
export class ListaClienteComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  search = signal('');

  displayedColumns = [
    'id',
    'nome',
    'email',
    'telefone',
    'cpfCnpj',
    'dataRegistro',
    'cidade',
    'uf',
    'actions'
  ];

  dataSource!: MatTableDataSource<Cliente>;
  private filtroSubscription: Subscription | undefined;

  constructor(private clienteService: ClienteService, private filtroService: FiltroClienteService) {
    this.dataSource = new MatTableDataSource(this.clienteService.getClientes());
  }

  ngOnInit(): void {
    this.filtroSubscription = this.filtroService.termoBusca$.subscribe(termo => {
      this.applyFilter(termo);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(termo: string) {
    this.dataSource.filter = termo.trim().toLowerCase();
  }
  
  editaCliente(cliente: Cliente) {
    console.log('Editar cliente:', cliente);
    // Aqui você pode abrir um diálogo de edição (MatDialog)
  }

  deletaCliente(cliente: Cliente) {
    console.log('Excluir cliente:', cliente);
    // Aqui você pode abrir uma confirmação antes de excluir
  }

  ngOnDestroy(): void {
    if (this.filtroSubscription) {
      this.filtroSubscription.unsubscribe();
    }
  }
}
