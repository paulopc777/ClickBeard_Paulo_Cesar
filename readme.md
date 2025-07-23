# ClickBeard - Sistema de Agendamento para Barbearia

Sistema de agendamento desenvolvido como teste técnico full stack para gerenciamento de uma barbearia.

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Fastify** - Framework web rápido e eficiente
- **Prisma ORM** - ORM para gerenciamento do banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT (@fastify/jwt)** - Autenticação e autorização
- **CORS (@fastify/cors)** - Controle de acesso entre domínios
- **TypeBox (@fastify/type-provider-typebox)** - Validação de tipos
- **Vitest** - Framework de testes
- **TSX** - Executor TypeScript para desenvolvimento

### Ferramentas de Desenvolvimento
- **Axios** - Cliente HTTP
- **@types/node** - Tipagens do Node.js

## 📁 Estrutura de Pastas

```
├── prisma/                     # Configurações do banco de dados
│   ├── schema.prisma          # Schema do banco
│   └── migrations/            # Migrações do banco
├── src/
│   ├── main.ts               # Arquivo principal da aplicação
│   ├── application/          # Camada de aplicação
│   │   ├── dto/              # Data Transfer Objects
│   │   └── services/         # Serviços de negócio
│   │       ├── auth/         # Autenticação
│   │       ├── barber/       # Gestão de barbeiros
│   │       ├── register/     # Cadastros
│   │       ├── schedule/     # Agendamentos
│   │       ├── services/     # Serviços oferecidos
│   │       └── working_schedule/ # Horários de trabalho
│   ├── config/              # Configurações
│   │   └── constants/       # Constantes da aplicação
│   ├── database/            # Camada de dados
│   │   ├── prisma.ts        # Configuração do Prisma
│   │   ├── model/           # Modelos de dados
│   │   ├── repository/      # Repositórios
│   │   └── seed/            # Scripts de inicialização do banco
│   ├── generated/           # Arquivos gerados pelo Prisma
│   ├── routes/              # Rotas da API
│   │   ├── controllers/     # Controladores
│   │   └── middleware/      # Middlewares
│   └── types/               # Definições de tipos
└── test/                    # Testes automatizados
```

## 🔐 Middlewares de Autenticação

O sistema possui três middlewares de autenticação principais:

### 1. ClientMiddleware (`auth.client.middleware.ts`)
- **Função**: Autentica usuários clientes
- **Verificação**: Valida apenas se o token JWT é válido
- **Uso**: Protege rotas que requerem autenticação básica de cliente

### 2. AdminMiddleware (`auth.admin.middleware.ts`)
- **Função**: Autentica barbeiros administradores
- **Verificação**: 
  - Valida o token JWT
  - Verifica se o usuário é um barbeiro
  - Confirma se o barbeiro existe no banco de dados
- **Uso**: Protege rotas administrativas da barbearia

### 3. CompanyMiddleware (`auth.company.middleware.ts`)
- **Função**: Autentica usuários da empresa
- **Verificação**: Valida apenas se o token JWT é válido
- **Uso**: Protege rotas específicas da empresa

## 🗄️ Banco de Dados

### Modelos Principais

- **User**: Clientes que fazem agendamentos
- **Barber**: Barbeiros que prestam serviços
- **Service**: Serviços oferecidos pela barbearia
- **BarberServices**: Relacionamento entre barbeiros e serviços
- **Schedules**: Agendamentos realizados
- **WorkingSchedule**: Horários de funcionamento

## 🌱 Seed do Banco de Dados

O arquivo `seed.data.ts` popula o banco com dados iniciais para desenvolvimento e testes:

### Dados Criados pelo Seed:

#### **Usuário Cliente**
- **Email**: `user@example.com`
- **Nome**: John Doe
- **Senha**: `securepassword`

#### **Barbeiros**
1. **Gabriel Nascimento** (Administrador)
   - **Email**: `gabriel@example.com`
   - **Senha**: `securepassword`
   - **Idade**: 30 anos
   - **Admin**: Sim
   - **Serviços**: Corte de Cabelo, Barba

2. **John Doe** (Barbeiro)
   - **Email**: `john@example.com`
   - **Senha**: `securepassword`
   - **Idade**: 35 anos
   - **Admin**: Não
   - **Serviços**: Sobrancelha, Hidratação

#### **Serviços Disponíveis**
- **Corte de Cabelo**: R$ 20,00
- **Barba**: R$ 15,00
- **Sobrancelha**: R$ 25,00
- **Hidratação**: R$ 30,00

#### **Horário de Funcionamento**
- **Segunda a Quinta**: 08:00 - 18:00 (Almoço: 12:00 - 13:00)
- **Sexta**: 08:00 - 18:00 (Almoço: 13:00 - 14:00)
- **Sábado**: 08:00 - 18:00 (Almoço: 12:00 - 13:00)

#### **Agendamentos de Exemplo**
O seed cria 4 agendamentos para o dia atual:
- 15:00 - Corte de Cabelo (Gabriel)
- 16:00 - Barba (Gabriel)
- 17:00 - Sobrancelha (John)
- 17:00 - Hidratação (John)

## 🚀 Como Executar

### Pré-requisitos
- Node.js
- PostgreSQL
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate dev

# Executar seed
npx tsx src/database/seed/seed.data.ts

# Iniciar servidor de desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:5050`

## 📋 Exemplos de Credenciais

### Para Login como Barbeiro Admin:
- **Email**: `gabriel@example.com`
- **Senha**: `securepassword`

### Para Login como Barbeiro:
- **Email**: `john@example.com`
- **Senha**: `securepassword`

### Para Login como Cliente:
- **Email**: `user@example.com`
- **Senha**: `securepassword`

## 🧪 Testes

```bash
# Executar testes
npm test
```

## 📝 Notas

- O projeto utiliza Prisma como ORM para maior produtividade e type safety
- JWT é usado para autenticação stateless
- O sistema permite diferentes níveis de acesso através dos middlewares
