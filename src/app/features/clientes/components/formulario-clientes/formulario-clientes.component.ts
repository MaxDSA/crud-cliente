import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Cliente } from '../../../../core/models/cliente.interface';
import { BrasilapiService } from '../../../../core/services/brasil-api.service';

@Component({
  selector: 'app-formulario-clientes',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
    MatDialogModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './formulario-clientes.component.html',
  styleUrl: './formulario-clientes.component.scss',
})
export class FormularioClientesComponent implements OnChanges {
  @Output() formSubmit = new EventEmitter<Cliente>();
  @Output() cancel = new EventEmitter<void>();

  clienteForm: FormGroup;
  estados: any;
  municipios: any;

  constructor(
    private brasilApiService: BrasilapiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cliente | null
  ) {
    this.clienteForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      cpfCnpj: ['', Validators.required],
      cidade: [''],
      uf: [''],
    });
  }

  ngOnInit(): void {    
    this.carregarUFs();
    if (this.data) {
      this.carregarMunicipios(this.data.uf);
      this.clienteForm.patchValue(this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.clienteForm.patchValue(this.data);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.clienteForm.addControl(
        'dataRegistro',
        this.fb.control(new Date().toLocaleDateString())
      );
      this.formSubmit.emit(this.clienteForm.value);
      this.clienteForm.reset();
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  getErrorMessage(field: string): string {
    const control = this.clienteForm.get(field);
    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (control?.hasError('email')) {
      return 'E-mail inválido';
    }
    return '';
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: (listaEstados) => (this.estados = listaEstados),
      error: (erro) => console.error('ocorreu um erro: ', erro),
    });
  }

  carregarMunicipios(uf: string) {
    this.brasilApiService.listarMunicipios(uf).subscribe({
      next: (listaMunicipios) => (this.municipios = listaMunicipios),
      error: (erro) => console.error('ocorreu um erro: ', erro),
    });
  }
}
