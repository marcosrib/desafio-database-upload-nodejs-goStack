# Desafio nivel2 GoStack

## :page_with_curl: Ídice: 
  - [Descriçao do projeto:](#memo-descriçao-do-projeto)
  - [Funcionalidades:](#gear-funcionalidades)
  - [Bibliotecas utilizadas:](#file_folder-bibliotecas-utilizadas)
-  [Banco de dados:](#floppy_disk-banco-de-dados)

## :memo:   Descriçao do projeto:

Neste desafio foi proposto o desenvolvimento de uma aplicação de transações financeiras com Node.js.

Para concluir este desafio teria que armazenar transações financeiras de entrada e saída e permitir o cadastro e a listagem dessas transações,
além de permitir a criação de novos registros no banco de dados a partir do envio de um arquivo csv

## :gear: Funcionalidades:

- [X] Realizar cadastro de uma transação.
- [X] Listar transações com o saldo.
- [X] Importar transações e a categoria via arquivo .
- [X] Deletar transações.

## :file_folder: Bibliotecas utilizadas: 
- express.
- pg.
- typeorm.
- csv-parse.
- express-async-errors.
## :floppy_disk: Banco de dados: 
- postgres.
:
## :arrow_forward: Como executar:
No terminal clone o projeto.
```
git clone https://github.com/marcosrib/desafio-database-upload-nodejs-goStack.git
```
Entre na pasta do projeto e instale as dependências executando.
```
yarn ou npm install
```
Para rodar o projeto execute.

```
yarn dev:server
```

