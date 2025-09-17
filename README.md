# CrudCliente

Projeto criado com Angular 19.

Este projeto tem como finalidade realizar o crud de clientes. 
Seu objetivo é demonstrar controle sobre os recursos da ferramenta e do uso de boas práticas.
Para este fim alguns componentes foram separados em partes menores no intuito de demonstrar o funcionamento da comunicação entre eles.

## Como rodar a aplicação em servidor local?

Para simular uma API rest foi utilizado a biblioteca json-server.
Para subir o servidor do json-server rode o comando abaixo na pasta raiz do projeto:

```bash
json-server --watch db.json
```

Após isso para subir o servidor do projeto angular rode o comando abaixo em outro console também na pasta raiz do projeto:

```bash
ng serve
```

Com o servidor rodando abra o navegador no endereço `http://localhost:4200/`.


## Como rodar os testes?

Para executar os testes unitários basta rodar o comando abaixo na raiz do projeto:

```bash
ng test
```

## Autenticação

Os usuários foram criados via mock para mostrar o funcionamento da autenticação e autorização.

O usuário ``admin`` possui pleno acesso as funcionalidades.

O usuário ``user`` não possui acesso a funcionalidade de exclusão.

Os acessos são:

``Usuários: admin e user``

``Senha: 1234``
