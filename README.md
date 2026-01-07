# Frontend - Avabot: Pet Feliz

Este projeto de uma aplicação de chatbot feita com **React, TypeScript e Tailwind** para coleta de feedback de clientes da clínica fictícia Pet Feliz, com interface web e painel administrativo, utilizando Node.js.

---

## Backend

Este repositório contém apenas o **frontend** da aplicação.

O código do **backend (Node, API, ChatBot e Banco de dados MySQL)** está disponível em um repositório separado no GitHub:

**Backend – Avabot: Pet Feliz**
(https://github.com/willqos15/Avabot_Backend)


---

## Screenshots


![Tela Inicial](https://res.cloudinary.com/drklvmtqp/image/upload/v1767753617/Captura_de_tela_2026-01-06_222925_sszory.png)

![Tela do Chat](https://res.cloudinary.com/drklvmtqp/image/upload/v1767753617/Captura_de_tela_2026-01-06_223034_zh6nar.png)

![Painel de Elogios](https://res.cloudinary.com/drklvmtqp/image/upload/v1767753617/Captura_de_tela_2026-01-06_233818_zl6juu.pngg)

![Painel Critica](https://res.cloudinary.com/drklvmtqp/image/upload/v1767753617/Captura_de_tela_2026-01-06_233836_by8618.png)

## Funcionalidades

- **Chat Interativo (Pchat)**
  - Recebe feedback do usuário sobre a experiência: `Boa` ou `Ruim`.
  - Exibe o histórico de mensagens entre o usuário e a IA.
  - Atualiza dinamicamente a conversa com novas mensagens.
  - Mostra animação de carregamento enquanto a IA responde.
  - Armazena um ID único de cada conversa no `localStorage`.

- **Painel Administrativo (Adm)**
  - Visualiza todas as conversas registradas.
  - Filtra conversas por avaliação (`Elogios` ou `Críticas`).
  - Mostra detalhes de cada conversa, incluindo ID, data e hora.
  - Deleta conversas com confirmação através de popup.
  - Indicação de carregamento enquanto os dados são carregados.
  - Navegação de volta para a página inicial.
  - Exibe o total de elogios e críticas, com contagem e percentual.



---

## Tecnologias Utilizadas

- **Frontend:** React, TypeScript, Tailwind CSS
- **Gerenciamento de Formulários:** react-hook-form
- **Roteamento:** react-router-dom
- **Animações:** Lottie
- **Ícones:** react-icons
- **Backend API:** Axios (consumindo endpoints externos)
- **Identificação de Conversa:** uuid


---

## Estrutura de Componentes

- **Adm.tsx**
  - Componente principal do painel administrativo.
  - Controla estados de carregamento, modo (boa/ruim), exibição de popup e lista de conversas.
  - Funções:
    - `puxadb()`: busca conversas da API.
    - `deletarbd(delid)`: deleta uma conversa pelo ID.
    - `gotohome()`: navega para a página inicial.
  - Usa o componente `Poup` para confirmação de exclusão.

- **Pchat.tsx**
  - Componente de chat interativo para o usuário.
  - Controla estados de feedback, verifica se o usuário já respondeu o (`xpuser`) inicial, carregamento, histórico de mensagens e exibição do chat.
  - Funções:
    - `bomxp() / ruimxp()`: define experiência do usuário.
    - `enviar(dados)`: envia mensagem para a API e recebe resposta da IA.
    - `gotoadmin()`: navega para o painel administrativo.
  - Scroll automático do chat usando `useRef`.

---

## Rotas

- `/` → Página principal do chat (`Pchat.tsx`)
- `/admin` → Painel administrativo (`Adm.tsx`)

---

## Estrutura de Dados

**HistoricoItem** (para exibir no chat do usuário):
```ts
interface HistoricoItem {
  quem: string; // "IA" ou "você"
  mensagem: string;
}
```

**Tipoitem** (conversas do painel administrativo):
```ts
interface Tipoitem {
  id: string;
  conversa: mensagem[];
  criado: string;
  xp: string; // "boa" ou "ruim"
```

**mensagem** (cada mensagem no histórico):
```ts
interface mensagem {
  hora: number;
  role: string; // "user" ou "IA"
  content: string;
}
```

---

## Instalação e Execução:

# 1- Clone o repositório
`git clone https://github.com/willqos15/Avabot_Frontend`

# 2- Entre na pasta do projeto
`cd Avabot_Frontend`

# 3- Instale as dependências
`npm install`

`npm install react react-dom react-router-dom axios react-hook-form uuid lottie-react react-icons tailwindcss postcss autoprefixer`

`npm install --save-dev typescript @types/react @types/react-dom @types/react-router-dom @types/react-icons`

`npx tailwindcss init -p`

`npx tailwindcss init -p`


# 4- Configure o Tailwind
no seu projeto React adicionando os paths no tailwind.config.js e importando o CSS no index.css.

# 5- Execute o projeto
`npm run dev`

# O frontend estará disponível em:
`http://localhost:3000`

---

## Estrutura de Projeto

- `src/assets` → imagens, ícones e animações  
- `src/components` → componentes React reutilizáveis  
- `src/pages` → páginas principais do sistema (Adm e Pchat)


```
Avabot_Frontend/
├─ .gitignore
├─ eslint.config.js
├─ estrutura.txt
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ vercel.json
├─ vite.config.ts
├─ node_modules/
│ └─ .package-lock.json
├─ public/
│ ├─ ico.png
│ └─ vite.svg
└─ src/
├─ App.css
├─ App.tsx
├─ index.css
├─ main.tsx
├─ page/
├─ assets/
│ ├─ BGfic.png
│ ├─ load.gif
│ ├─ Logofic.png
│ ├─ react.svg
│ └─ square-loading.json
├─ components/
│ └─ poup.tsx
└─ pages/
├─ Adm.tsx
└─ Pchat.tsx
```

---

## 👨‍💻 Sobre o autor

Desenvolvido por William Queiroz
🔗 Portfólio: (https://queirozdeveloper.vercel.app/)


