import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioClientesComponent } from './formulario-clientes.component';
import { BrasilapiService } from '../../../../core/services/brasil-api.service';

describe('FormularioClientesComponent', () => {
  let component: FormularioClientesComponent;
  let fixture: ComponentFixture<FormularioClientesComponent>;
  let brasilApiServiceMock: any;

  beforeEach(async () => {
    brasilApiServiceMock = {
      listarUFs: jasmine.createSpy('listarUFs').and.returnValue(of([{ sigla: 'SP', nome: 'SÃO PAULO' }])),
      listarMunicipios: jasmine.createSpy('listarMunicipios').and.returnValue(of([{ nome: 'SÃO PAULO' }]))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormularioClientesComponent],
      providers: [
        FormBuilder,
        { provide: BrasilapiService, useValue: brasilApiServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com campos vazios', () => {
    const form = component.clienteForm.value;
    expect(form.nome).toBe('');
    expect(form.email).toBe('');
    expect(form.cpfCnpj).toBe('');
  });

  it('deve marcar campos como inválidos quando submetido sem preencher', () => {
    component.onSubmit();
    expect(component.clienteForm.invalid).toBeTrue();
    expect(component.clienteForm.get('nome')?.touched).toBeTrue();
    expect(component.clienteForm.get('email')?.touched).toBeTrue();
    expect(component.clienteForm.get('cpfCnpj')?.touched).toBeTrue();
  });

  it('deve emitir evento de submit quando formulário válido', () => {
    spyOn(component.formSubmit, 'emit');

    component.clienteForm.patchValue({
      nome: 'João',
      email: 'joao@email.com',
      telefone: '11999999999',
      cpfCnpj: '12345678900',
      cidade: 'São Paulo',
      uf: 'SP'
    });

    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalled();
  });

  it('deve emitir evento de cancel ao chamar onCancel()', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('deve retornar mensagem de erro "Campo obrigatório" para campo required', () => {
    component.clienteForm.get('nome')?.markAsTouched();
    component.clienteForm.get('nome')?.setValue('');
    expect(component.getErrorMessage('nome')).toBe('Campo obrigatório');
  });

  it('deve retornar mensagem de erro "E-mail inválido" para email incorreto', () => {
    component.clienteForm.get('email')?.setValue('invalido');
    expect(component.getErrorMessage('email')).toBe('E-mail inválido');
  });

  it('deve carregar UFs ao inicializar', () => {
    component.carregarUFs();
    expect(brasilApiServiceMock.listarUFs).toHaveBeenCalled();
    expect(component.estados.length).toBeGreaterThan(0);
  });

  it('deve carregar Municípios ao chamar carregarMunicipios', () => {
    component.carregarMunicipios('SP');
    expect(brasilApiServiceMock.listarMunicipios).toHaveBeenCalledWith('SP');
    expect(component.municipios.length).toBeGreaterThan(0);
  });

  it('deve tratar erro ao carregar UFs', () => {
    brasilApiServiceMock.listarUFs.and.returnValue(throwError(() => new Error('Erro')));
    spyOn(console, 'error');
    component.carregarUFs();
    expect(console.error).toHaveBeenCalled();
  });

  it('deve tratar erro ao carregar Municípios', () => {
    brasilApiServiceMock.listarMunicipios.and.returnValue(throwError(() => new Error('Erro')));
    spyOn(console, 'error');
    component.carregarMunicipios('SP');
    expect(console.error).toHaveBeenCalled();
  });
});