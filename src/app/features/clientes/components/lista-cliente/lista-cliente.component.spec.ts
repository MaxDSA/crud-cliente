import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListaClienteComponent } from './lista-cliente.component';
import { ClienteService } from '../../services/cliente.service';
import { FiltroClienteService } from '../../services/filtro-cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth/auth.service';
import { of, Subject, throwError } from 'rxjs';

describe('ListaClienteComponent', () => {
  let component: ListaClienteComponent;
  let fixture: ComponentFixture<ListaClienteComponent>;

  let clienteServiceMock: any;
  let filtroServiceMock: any;
  let dialogMock: any;
  let toastrMock: any;
  let authServiceMock: any;

  beforeEach(async () => {
    clienteServiceMock = {
      getClientes: jasmine.createSpy('getClientes').and.returnValue(of([
        { id: '1', nome: 'João', email: 'joao@email.com', telefone: '123', cpfCnpj: '123', cidade: 'SÃO PAULO', uf: 'SP', dataRegistro: '01/01/2025' }
      ])),
      postCliente: jasmine.createSpy('postCliente').and.returnValue(of({ id: '2', nome: 'Maria' })),
      putCliente: jasmine.createSpy('putCliente').and.returnValue(of({ id: '1', nome: 'João Editado' })),
      deleteCliente: jasmine.createSpy('deleteCliente').and.returnValue(of({}))
    };

    filtroServiceMock = {
      termoBusca$: new Subject<string>()
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        componentInstance: {
          formSubmit: new Subject<any>(),
          cancel: new Subject<void>()
        },
        afterClosed: () => of(true),
        close: jasmine.createSpy('close')
      })
    };

    toastrMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    authServiceMock = { 
        isAuthenticated: () => true,
        hasRole: jasmine.createSpy('hasRole').and.returnValue(true) 
    };

    await TestBed.configureTestingModule({
      imports: [ListaClienteComponent],
      providers: [
        { provide: ClienteService, useValue: clienteServiceMock },
        { provide: FiltroClienteService, useValue: filtroServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar dataSource com clientes', () => {
    expect(component.dataSource.data.length).toBe(1);
    expect(clienteServiceMock.getClientes).toHaveBeenCalled();
  });

  it('deve aplicar filtro corretamente', () => {
    component.applyFilter('joao');
    expect(component.dataSource.filter).toBe('joao');
  });

  it('deve abrir dialog para novo cliente e criar', fakeAsync(() => {
    const dialogRef = dialogMock.open();
    component.openFormDialog();
    tick();

    const newCliente = { nome: 'Novo', email: 'novo@email.com' };
    dialogRef.componentInstance.formSubmit.next(newCliente);

    expect(clienteServiceMock.postCliente).toHaveBeenCalledWith(newCliente);
    expect(toastrMock.success).toHaveBeenCalledWith('Cliente criado com sucesso!');
  }));

  it('deve abrir dialog para editar cliente e atualizar', fakeAsync(() => {
    const dialogRef = dialogMock.open();
    const cliente = component.dataSource.data[0];
    component.openFormDialog(cliente);
    tick();

    const editedCliente = { ...cliente, nome: 'João Editado' };
    dialogRef.componentInstance.formSubmit.next(editedCliente);

    expect(clienteServiceMock.putCliente).toHaveBeenCalledWith(editedCliente);
    expect(toastrMock.success).toHaveBeenCalledWith('Cliente atualizado com sucesso!');
  }));

  it('deve excluir cliente corretamente', fakeAsync(() => {
    const cliente = component.dataSource.data[0];
    component.deleteCliente(cliente);
    tick();

    expect(clienteServiceMock.deleteCliente).toHaveBeenCalledWith(cliente.id);
    expect(toastrMock.success).toHaveBeenCalledWith('Cliente excluído com sucesso!');
  }));
});