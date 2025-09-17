import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClientesPageComponent } from './clientes-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ClienteService } from '../services/cliente.service';

describe('ClientesPageComponent', () => {
  let component: ClientesPageComponent;
  let fixture: ComponentFixture<ClientesPageComponent>;
  let clienteServiceMock: any;
  let toastrMock: any;

  const mockClientes = [
    { id: '1', nome: 'João', email: 'joao@email.com', telefone: '11999999999', cpfCnpj: '12345678900', cidade: 'SP', uf: 'SP', dataRegistro: '01/01/2025' },
    { id: '2', nome: 'Maria', email: 'maria@email.com', telefone: '21999999999', cpfCnpj: '98765432100', cidade: 'RJ', uf: 'RJ', dataRegistro: '02/01/2025' }
  ];

  beforeEach(async () => {
    clienteServiceMock = {
      getClientes: jasmine.createSpy('getClientes').and.returnValue(of(mockClientes))
    };

    toastrMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
      info: jasmine.createSpy('info'),
      warning: jasmine.createSpy('warning')
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ClientesPageComponent],
      providers: [
        { provide: ClienteService, useValue: clienteServiceMock },
        { provide: ToastrService, useValue: toastrMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});