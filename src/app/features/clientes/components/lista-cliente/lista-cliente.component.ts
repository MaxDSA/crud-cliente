import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Cliente } from '../../../../core/models/cliente.interface';
import { ClienteService } from '../../services/cliente.service';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FiltroClienteService } from '../../services/filtro-cliente.service';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { getPortuguesePaginatorIntl } from '../../../../shared/config/ptbr-paginator-intl';
import { MatDialog } from '@angular/material/dialog';
import { FormularioClientesComponent } from '../formulario-clientes/formulario-clientes.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-cliente',
  exportAs: 'app-lista-cliente',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatIconButton,
    MatFabButton,
    NgxMaskPipe,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    provideNgxMask(),
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
    'actions',
  ];

  dataSource!: MatTableDataSource<Cliente>;
  private filtroSubscription: Subscription | undefined;

  constructor(
    private clienteService: ClienteService,
    private filtroService: FiltroClienteService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.dataSource.data = clientes;
      }, error: (err) => {
        this.toastr.error('Erro ao carregar clientes.');
        console.error('Erro ao carregar clientes:', err);
      }
    });

    this.filtroSubscription = this.filtroService.termoBusca$.subscribe(
      (termo) => {
        this.applyFilter(termo);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(termo: string) {
    this.dataSource.filter = termo.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    if (this.filtroSubscription) {
      this.filtroSubscription.unsubscribe();
    }
  }

  openFormDialog(cliente?: Cliente) {
    const dialogRef = this.dialog.open(FormularioClientesComponent, {
      width: '700px',
      data: cliente ? { ...cliente } : null,
    });

    dialogRef.componentInstance.formSubmit.subscribe((result: Cliente) => {
      if (result.id) {
        // edição
        this.clienteService.putCliente(result).subscribe({
          next: (clienteAlterado) => {
            this.toastr.success('Cliente atualizado com sucesso!');
            const index = this.dataSource.data.findIndex(
              (c) => c.id === clienteAlterado.id
            );
            if (index > -1) {
              this.dataSource.data[index] = clienteAlterado;
              this.dataSource._updateChangeSubscription();
            }
          }, error: (err) => {
            this.toastr.error('Erro ao criar cliente.');
            console.error('Erro ao atualizar cliente:', err);
          }
        });
      } else {
        // criação
        // atribui um novo ID pois a API json-server não faz isso automaticamente
        const newId = Math.max(...this.dataSource.data.map((c) => c.id)) + 1;
        result.id = newId.toString();

        this.clienteService.postCliente(result).subscribe({
          next: (novoCliente) => {
            this.dataSource.data = [...this.dataSource.data, novoCliente];
            this.toastr.success('Cliente criado com sucesso!');
          }, error: (err) => {
            this.toastr.error('Erro ao criar cliente.');
            console.error('Erro ao criar cliente:', err);
          }
        });
      }
      dialogRef.close();
    });
    dialogRef.componentInstance.cancel.subscribe(() => dialogRef.close());
  }

  deleteCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Excluir Cliente',
        message: `Tem certeza que deseja excluir o cliente "${cliente.nome}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clienteService.deleteCliente(cliente.id).subscribe({
          next: () => {
            this.dataSource.data = this.dataSource.data.filter(
              (c) => c.id !== cliente.id
            );
            this.toastr.success('Cliente excluído com sucesso!');
          },
          error: (err) => {
            this.toastr.error('Erro ao excluir cliente.');
            console.error('Erro ao excluir cliente:', err);
          },
        });
      }
    });
  }
}