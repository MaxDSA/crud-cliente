import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioClientesPageComponent } from './formulario-clientes-page.component';

describe('FormularioClientesPageComponent', () => {
  let component: FormularioClientesPageComponent;
  let fixture: ComponentFixture<FormularioClientesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioClientesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioClientesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
