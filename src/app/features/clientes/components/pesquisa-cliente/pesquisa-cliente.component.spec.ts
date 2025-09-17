import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesquisaClienteComponent } from './pesquisa-cliente.component';
import { FiltroClienteService } from '../../services/filtro-cliente.service';
import { MatInputModule } from '@angular/material/input';

describe('PesquisaClienteComponent', () => {
  let component: PesquisaClienteComponent;
  let fixture: ComponentFixture<PesquisaClienteComponent>;
  let filtroServiceMock: any;

  beforeEach(async () => {
    filtroServiceMock = {
      atualizarTermoBusca: jasmine.createSpy('atualizarTermoBusca')
    };

    await TestBed.configureTestingModule({
      imports: [MatInputModule, PesquisaClienteComponent],
      providers: [
        { provide: FiltroClienteService, useValue: filtroServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PesquisaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar service.atualizarTermoBusca ao digitar no input', () => {
    const inputEvent = {
      target: { value: 'João' }
    } as unknown as Event;

    component.onInput(inputEvent);
    expect(filtroServiceMock.atualizarTermoBusca).toHaveBeenCalledWith('João');
  });
});