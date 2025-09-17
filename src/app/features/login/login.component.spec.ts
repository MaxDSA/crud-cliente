import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        LoginComponent
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o loginForm com campos vazios', () => {
    expect(component.loginForm.value.username).toBe('');
    expect(component.loginForm.value.password).toBe('');
  });

  it('não deve submeter formulário inválido', () => {
    component.loginForm.setValue({ username: '', password: '' });
    component.onSubmit();
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('deve submeter formulário válido e redirecionar se login for bem-sucedido', () => {
    component.loginForm.setValue({ username: 'admin', password: '1234' });
    authServiceMock.login.and.returnValue(true);

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith('admin', '1234');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/clientes']);
    expect(component.loginError).toBe('');
  });

  it('deve mostrar mensagem de erro se login inválido', () => {
    component.loginForm.setValue({ username: 'admin', password: '1234' });
    authServiceMock.login.and.returnValue(false);

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith('admin', '1234');
    expect(component.loginError).toBe('Usuário ou senha incorretos.');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});