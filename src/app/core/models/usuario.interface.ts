export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: 'admin' | 'user';
  token: string;
}