import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ClienteService } from '../../features/clientes/services/cliente.service';

export function cpfCnpjUnicoValidator(store: ClienteService, currentId?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpfCnpj = control.value;
    if (!cpfCnpj) return null;

    const existe = store.clientesArmazenados.some(c => c.cpfCnpj === cpfCnpj && c.id !== currentId);
    return existe ? { cpfCnpjInvalido: true } : null;
  };
}