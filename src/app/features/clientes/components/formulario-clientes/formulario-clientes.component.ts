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
import { cpfCnpjUnicoValidator } from '../../../../shared/validators/cpfCnpjUnique.validator';
import { ClienteService } from '../../services/cliente.service';

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
    private clienteService: ClienteService,
    private brasilApiService: BrasilapiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cliente | null
  ) {
    this.clienteForm = this.fb.group({
      id: [null],
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      cpfCnpj: [
        '',
        [
          Validators.required,
          cpfCnpjUnicoValidator(this.clienteService, this.data?.id),
        ],
      ],
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
    this.clienteForm.get('cpfCnpj')?.updateValueAndValidity();
    this.clienteForm.addControl(
      'dataRegistro',
      this.fb.control(new Date().toLocaleDateString())
    );

    if (this.clienteForm.valid) {
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
    if (control?.hasError('maxlength')) {
      const maxLength = control.getError('maxlength').requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    if (control?.hasError('cpfCnpjInvalido')) {
      return 'CPF/CNPJ já cadastrado';
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
