# Agenda Fácil

Sistema de agendamento online para serviços contábeis. Permite que clientes agendem consultas 24/7 através de uma interface moderna, enquanto oferece aos contadores um dashboard administrativo para gestão completa dos agendamentos.

**Desenvolvido por:** Luis Felipe Ribeiro da Silva  
**Contato:** contato@felipes.dev  
**Telefone:** +55 (19) 95871-1160

## Tecnologias Utilizadas

- **Next.js 15** - Framework React full-stack
- **TypeScript** - Linguagem com tipagem estática
- **Hono** - Framework web leve e performático
- **tRPC** - APIs end-to-end com type safety
- **Drizzle ORM** - ORM TypeScript-first
- **PostgreSQL** - Banco de dados relacional
- **Better-Auth** - Sistema de autenticação
- **shadcn/ui** - Componentes UI reutilizáveis
- **Tailwind CSS** - Framework CSS utility-first
- **Bun** - Runtime JavaScript otimizado
- **Turborepo** - Sistema de build monorepo otimizado
- **Biome** - Linting e formatação de código

## Como Começar

### Pré-requisitos

- Node.js 18+ ou Bun instalado
- PostgreSQL instalado e em execução
- Conta no Neon ou outro provedor de PostgreSQL (opcional)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/agenda-facil-app.git
cd agenda-facil-app
```

2. Instale as dependências:
```bash
bun install
```

3. Configure as variáveis de ambiente:
```bash
# Copie o arquivo .env.example
cp apps/server/.env.example apps/server/.env

# Edite o arquivo .env e configure sua conexão com o banco de dados
```

4. Configure o banco de dados:
```bash
# Aplique o schema no banco de dados
bun db:push

# (Opcional) Popule o banco com dados de exemplo
bun db:seed
```

5. Execute o servidor de desenvolvimento:
```bash
bun dev
```

A aplicação estará disponível em:
- **Frontend:** [http://localhost:3001](http://localhost:3001)
- **Backend API:** [http://localhost:3000](http://localhost:3000)




## Estrutura do Projeto

```
agenda-facil-app/
├── apps/
│   ├── web/              # Aplicação frontend (Next.js)
│   └── server/           # API backend (Hono, tRPC)
├── packages/
│   ├── api/              # Lógica de negócio e rotas
│   ├── auth/             # Configuração de autenticação
│   └── db/               # Schema e queries do banco
```

## Scripts Disponíveis

- `bun dev` - Inicia todos os apps em modo desenvolvimento
- `bun build` - Compila todos os apps para produção
- `bun dev:web` - Inicia apenas a aplicação web
- `bun dev:server` - Inicia apenas o servidor
- `bun check-types` - Verifica tipos TypeScript
- `bun db:push` - Aplica mudanças no schema do banco
- `bun db:studio` - Abre o Drizzle Studio (UI do banco)
- `bun db:generate` - Gera migrations
- `bun db:seed` - Popula o banco com dados de exemplo
- `bun check` - Executa linting e formatação

## Funcionalidades

### Para Clientes
- ✨ Agendamento online 24/7
- 📅 Seleção de data e horário disponível
- 🔔 Confirmação por email
- 📱 Interface responsiva
- 🔒 Dados seguros e protegidos

### Para Administradores
- 🎛️ Dashboard administrativo completo
- 📊 Gestão de agendamentos
- ⚙️ Gerenciamento de serviços
- 🚫 Bloqueio de horários
- ⏰ Configuração de horários de funcionamento

## Contribuição

Contribuições são bem-vindas! Por favor, leia o guia de contribuição antes de enviar PRs.

## Licença

Este projeto é propriedade de Luis Felipe Ribeiro da Silva. Todos os direitos reservados.
