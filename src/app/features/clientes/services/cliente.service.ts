import { Injectable } from '@angular/core';
import { Cliente } from '../../../core/models/cliente.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  getClientes(): Cliente[] {
    return this.clientes;
  }

  private clientes: Cliente[] = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020', 
      cidade: 'São Paulo',
      uf: 'SP',
    },
    {
      id: 2,
      nome: 'Maria Souza',
      email: 'maria@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Fortaleza',
      uf: 'CE',
    },
    {
      id: 3,
      nome: 'Carlos Oliveira',
      email: 'carlos@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Belo Horizonte',
      uf: 'MG',
    },
    {
      id: 4,
      nome: 'Ana Pereira',
      email: 'ana@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Belo Horizonte',
      uf: 'MG',
    },
    {
      id: 5,
      nome: 'Pedro Lima',
      email: 'pedro@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Belém',
      uf: 'PA'
    },
    {
      id: 6,
      nome: 'Lucas Fernandes',
      email: 'lucas@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Rio de Janeiro',
      uf: 'RJ'
    },
    {
      id: 7,
      nome: 'Mariana Costa',
      email: 'mariana@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    {
      id: 8,
      nome: 'Rafael Gomes',
      email: 'rafael@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Porto Alegre',
      uf: 'RS'
    },
    {
      id: 9,
      nome: 'Beatriz Rocha',
      email: 'beatriz@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Recife',
      uf: 'PE'
    },
    {
      id: 10,
      nome: 'Felipe Martins',
      email: 'felipe@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    {
      id: 11,
      nome: 'Juliana Alves',
      email: 'juliana@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'São Paulo',
      uf: 'SP'
    },
    {
      id: 12,
      nome: 'Gustavo Ribeiro',
      email: 'gustavo@email.com',
      telefone: '(11) 98765-4321',
      cpfCnpj: '123.456.789-00',
      dataRegistro: '01/01/2020',
      cidade: 'Rio de Janeiro',
      uf: 'RJ'
    },
  ];
}
