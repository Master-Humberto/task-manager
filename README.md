# Task Manager

Este projeto implementa uma API simples de gerenciamento de tarefas utilizando Node.js, Express e PostgreSQL, seguindo o padrão de arquitetura MVC (Model-View-Controller). A API permite criar, visualizar, editar e excluir tarefas através de endpoints REST via fetch API e, além disso, há uma interface para interação do usuário com a aplicação.

## Descrição do Sistema

O Task Manager é uma aplicação backend que facilita a organização e acompanhamento de atividades. O sistema foi desenvolvido com foco na simplicidade e eficiência, permitindo operações CRUD (Create, Read, Update, Delete) para tarefas.

Principais funcionalidades:
- Criação, visualização, edição e exclusão de tarefas (CRUD completo)
- Respostas JSON para visualização clara das operações
- Conexão com banco de dados PostgreSQL

## Estrutura de Pastas e Arquivos

O projeto segue uma estrutura organizada baseada no padrão MVC, separando claramente as responsabilidades:

```
task-manager/
│
├── config/                # Arquivos de configuração
│   └── database.js        # Configuração de conexão com o banco de dados
├── controllers/           # Controladores da aplicação
│   └── TaskController.js  # Controlador de tarefas
├── models/                # Modelos de dados
│   └── Task.js            # Modelo de tarefas
├── routes/                # Definição das rotas
│   └── index.js           # Rotas principais da aplicação
├── .env.example           # Exemplo de variáveis de ambiente
├── init.sql               # Script SQL para inicialização do banco
├── package.json           # Dependências e scripts do projeto
├── server.js              # Arquivo principal que inicializa o servidor
└── README.md              # Documentação do projeto
```

## Modelo do Banco de Dados

O banco de dados foi projetado de forma simples, contendo apenas a tabela de tarefas:

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Endpoints da API

A API disponibiliza os seguintes endpoints:

- `GET /`: Verifica o status da API e lista todos os endpoints disponíveis
- `GET /api/tasks`: Lista todas as tarefas
- `GET /api/tasks/:id`: Busca uma tarefa específica pelo ID
- `POST /api/tasks`: Cria uma nova tarefa
- `PUT /api/tasks/:id`: Atualiza uma tarefa existente
- `DELETE /api/tasks/:id`: Exclui uma tarefa

## Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (v14 ou superior)
- npm (v6 ou superior)
- PostgreSQL (v12 ou superior)

### Passos para Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/humberto-filho/task-manager.git
   cd task-manager
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas configurações locais.
   Ou, de forma alternativa, crie um arquivo .env no seu editor de código (foi usado o Visual Studio Code nessa aplicação) e colocar suas variáveis de ambiente.

4. **Inicialize o banco de dados**
   - Crie um banco de dados PostgreSQL chamado `task_manager`
   - Execute o script SQL de inicialização:
   ```bash
   psql -U seu_usuario -d task_manager -f init.sql
   ```
   Ou use o comando npm configurado no package.json:
   ```bash
   npm run init-db
   ```

5. **Inicie o servidor**
   ```bash
   npm start
   ```


6. **Teste a API**
   Acesse `http://localhost:3000` para verificar se a API está funcionando.
   
   Você pode usar ferramentas como Postman, Insomnia ou curl para testar os endpoints.

## Bibliotecas Utilizadas

- **express**: Framework web para Node.js
- **pg**: Cliente PostgreSQL para Node.js
- **dotenv**: Carregamento de variáveis de ambiente
- **ejs**: criar o view e renderizar adequadamente

## Exemplos de Uso

### Criar uma tarefa
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Nova Tarefa", "description": "Descrição da tarefa", "status": "pendente"}'
```

### Listar todas as tarefas
```bash
curl -X GET http://localhost:3000/api/tasks
```

### Buscar uma tarefa específica
```bash
curl -X GET http://localhost:3000/api/tasks/1
```

## Adiciona uma tarefa nova
```bash
curl -X POST http://localhost:3000/api/tasks

### Atualizar uma tarefa
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Tarefa Atualizada", "description": "Nova descrição", "status": "em andamento"}'
```

### Excluir uma tarefa
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

### Vídeo explicando sobre o Task Maanger

[Assista ao vídeo mostrando tudo do Task Manager](https://youtu.be/JM0T-YaOA6g)

## Referências 
- Visual Studio Code : https://code.visualstudio.com/
