# 🗓️ Agenda Fácil

> Sistema completo de agendamento online para escritórios contábeis

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Hono](https://img.shields.io/badge/Hono-4.0-orange?style=flat-square)](https://hono.dev/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-green?style=flat-square)](https://orm.drizzle.team/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

## 📖 Sobre o Projeto

O **Agenda Fácil** é um sistema moderno de agendamento desenvolvido especificamente para escritórios contábeis. Permite que clientes agendem consultas online 24/7, enquanto oferece aos contadores um dashboard administrativo completo para gestão dos agendamentos.

### 🎯 Problema Resolvido

Muitos escritórios contábeis ainda dependem exclusivamente do telefone para agendamentos, gerando:
- ❌ Perda de clientes fora do horário comercial
- ❌ Interrupções constantes durante o trabalho
- ❌ Desorganização da agenda
- ❌ Experiência ruim para o cliente

### ✨ Solução Oferecida

- ✅ **Agendamento 24/7** - Clientes podem agendar a qualquer hora
- ✅ **Interface Intuitiva** - Processo simples e rápido
- ✅ **Dashboard Administrativo** - Gestão completa dos agendamentos
- ✅ **Responsive Design** - Funciona perfeitamente em mobile e desktop

## 🚀 Demo

**🔗 [Ver Demo Online](https://agenda-facil-app.felipes.dev)**

### 🔐 Credenciais de Teste:
- **Email:** admin@agendafacil.com
- **Senha:** 12345678

## 🛠️ Tecnologias Utilizadas

### Frontend
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI modernos
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas

### Backend
- **[Hono](https://hono.dev/)** - Framework web rápido e leve
- **[oRPC](https://orpc.unnoq.com/)** - RPC type-safe
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript-first
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Better-auth](https://better-auth.com/)** - Autenticação moderna

### Ferramentas de Desenvolvimento
- **[Bun](https://bun.sh/)** - Runtime e package manager
- **[Biome](https://biomejs.dev/)** - Linter e formatter
- **[Oxlint](https://oxc-project.github.io/)** - Linter ultra-rápido

## 🏗️ Arquitetura

```
agenda-facil-app/
├── apps/web/                # Frontend Next.js
│   ├── src/app/            # App Router pages
│   ├── src/components/     # Componentes reutilizáveis
│   └── src/lib/            # Utilitários
├── packages/
│   ├── api/                # Backend Hono + oRPC
│   ├── auth/               # Better-auth config
│   ├── db/                 # Drizzle schema + migrations
│   └── ui/                 # Componentes compartilhados
```

## ⚡ Instalação e Uso

### Pré-requisitos
- **Node.js 18+** ou **Bun 1.0+**
- **PostgreSQL** (local ou remoto)
- **Git**

### 1. Clone o repositório
```
git clone https://github.com/felipesdotdev/agenda-facil-app.git
cd agenda-facil-app
```

### 2. Instale as dependências
```
# Com Bun (recomendado)
bun install

# Ou com npm
npm install
```

### 3. Configure as variáveis de ambiente
```
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure suas variáveis:
DATABASE_URL="postgresql://...."
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

### 4. Configure o banco de dados
```
# Gerar schema
bun db:generate

# Executar migrations
bun db:migrate

# Popular com dados de exemplo
bun db:seed
```

### 5. Execute o projeto
```
# Desenvolvimento
bun dev

# Produção
bun build
bun start
```

### 6. Acesse a aplicação
- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3000/admin

## 📋 Funcionalidades

### Para Clientes
- [x] Landing page informativa
- [x] Calendário visual com horários disponíveis
- [x] Formulário de agendamento com validação
- [x] Confirmação de agendamento
- [x] Interface responsiva

### Para Administradores
- [x] Sistema de autenticação
- [x] Dashboard com estatísticas
- [x] Lista de agendamentos
- [x] Filtros por data e status
- [x] Ações (confirmar/cancelar/remarcar)
- [x] Interface administrativa completa

### Técnicas
- [x] API REST type-safe com oRPC
- [x] Validação robusta com Zod
- [x] Persistência com PostgreSQL
- [x] Deploy automático na Vercel
- [x] Performance otimizada
- [x] Autenticação segura

## 🎨 Design System

### Cores
- **Primary:** Blue-600 (confiança profissional)
- **Success:** Green-500 (confirmações)
- **Warning:** Orange-500 (atenção)
- **Neutral:** Gray-100/800 (textos e fundos)

### Componentes
Baseado no **shadcn/ui** com customizações específicas para o domínio contábil.

## 🚀 Deploy

### Vercel (Recomendado)
```
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker
```
# Build da imagem
docker build -t agenda-facil .

# Executar container
docker run -p 3000:3000 agenda-facil
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📝 Roadmap

### Versão 2.0
- [ ] Integração com WhatsApp API
- [ ] Sincronização com Google Calendar
- [ ] Sistema de notificações por email
- [ ] Multi-tenancy (múltiplos escritórios)
- [ ] Pagamento online
- [ ] Relatórios avançados

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Luis Felipe Ribeiro da Silva**
- GitHub: [@felipesdotdev](https://github.com/felipesdotdev)
- LinkedIn: [Luis Felipe](https://linkedin.com/in/luisfelipe)
- Email: contato@felipes.dev

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no repositório!**

---

*Desenvolvido com ❤️ para a comunidade contábil de Piracicaba*