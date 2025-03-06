
# Projeto de Web API com ASP .NET Core e Frontend em React

Este projeto consiste em uma aplicação que utiliza **ASP .NET Core Web API** no backend e **React** no frontend. O backend expõe endpoints que podem ser consumidos pelo frontend para interação com os dados.

## Tecnologias utilizadas

- **Backend**: ASP .NET Core Web API
- **Frontend**: React (com Vite)
- **Banco de dados**: SQL Server

## Instruções de Inicialização

### Pré-requisitos

- **.NET SDK** (versão 8 ou superior)
- **Node.js** (versão 18 ou superior)

### Backend - ASP .NET Core Web API

1. Navegue até o diretório do backend do projeto:

   ```bash
   cd /controle-pagamentos-api
   ```

2. Restaure as dependências do projeto:

   ```bash
   dotnet restore
   ```

3. Inicie o servidor da API:

   ```bash
   dotnet run
   ```

   A API estará rodando na URL `https://localhost:5118`

### Frontend - React

1. Navegue até o diretório do frontend:

   ```bash
   cd /controle-pagamentos-front
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   O frontend estará rodando na URL `http://localhost:5173`.

## Configuração do Banco de Dados

### String de Conexão

A string de conexão ao banco de dados está configurada no arquivo `appsettings.json` na raiz do seu projeto. Para fazer a conexão com o banco de dados, basta garantir que a string de conexão esteja correta.

Aqui está um exemplo de como a string de conexão pode se parecer no `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SeuBancoDeDados;User Id=seuUsuario;Password=suaSenha;"
  }
}
```
