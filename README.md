<div align="center">

# Raphael L. Rapisardi — Portfolio

**Backend Developer · Event-Driven Systems · AWS Cloud · Apache Kafka**

[![Deploy](https://img.shields.io/badge/Live-raphaelrapisardi.netlify.app-rose?style=flat-square&logo=netlify)](https://raphaelrapisardi.netlify.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Raphael_Rapisardi-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/raphael-rapisardi-a55790235)
[![GitHub](https://img.shields.io/badge/GitHub-RaphaelRapisardi2003-333?style=flat-square&logo=github)](https://github.com/RaphaelRapisardi2003)

</div>

---

## Sobre o Projeto

Portfolio pessoal desenvolvido com **React + TypeScript + Vite**, com design dark inspirado em interfaces de sistemas técnicos. Inclui animações com Framer Motion, fundo de estrelas animado com parallax em 3 camadas, navbar fixa responsiva com menu hambúrguer, e seção de projetos com modal de detalhes.

---

## Stack

| Tecnologia | Uso |
|---|---|
| React 19 + TypeScript | UI e lógica de estado |
| Vite 6 | Build e dev server |
| Tailwind CSS v4 | Estilização utilitária |
| Framer Motion | Animações e transições |
| Lucide React | Ícones |

---

## Rodar Localmente

**Pré-requisito:** Node.js 18+

```bash
# 1. Instalar dependências
npm install

# Se houver erro de certificado SSL (rede corporativa):
npm config set strict-ssl false
npm install
npm config set strict-ssl true

# 2. Iniciar o servidor de desenvolvimento
npm run dev
# → http://localhost:3000
```

---

## Estrutura

```
portfolio-project/
├── public/
│   └── profile.png          # Foto de perfil (circular)
│   └── screenshots/         # ← coloque aqui os prints dos projetos
│       ├── viper.png
│       ├── neeko.png
│       └── luciobot.png
├── src/
│   ├── components/
│   │   ├── ContactForm.tsx
│   │   ├── NetworkTopology.tsx
│   │   └── SkillMatrix.tsx
│   ├── App.tsx              # Componente principal + todas as seções
│   ├── types.ts             # Tipos e dados (PORTFOLIO_DATA)
│   ├── index.css            # Estilos globais + animação das estrelas
│   └── main.tsx
├── index.html
└── vite.config.ts
```

---

## Adicionar Screenshots dos Projetos

Os cards de projetos exibem um gradiente por padrão. Para substituir por screenshots reais:

1. Salve a imagem em `public/screenshots/nome-do-projeto.png`
2. Em `src/types.ts`, descomente e preencha o campo `imageUrl`:

```ts
// Viper
imageUrl: "/screenshots/viper.png",

// Neeko
imageUrl: "/screenshots/neeko.png",

// LucioBot
imageUrl: "/screenshots/luciobot.png",
```

> **Dica:** Tamanho recomendado: **800×600px** ou proporção **4:3**. Formato PNG ou WebP.

---

## Deploy (Netlify)

```bash
npm run build
# pasta gerada: dist/
# faça upload da pasta dist/ no Netlify ou conecte o repositório
```

---

## Contato

**Raphael L. Rapisardi**
- Email: raphaelimarapisardi@gmail.com
- WhatsApp: (11) 99799-6417
- LinkedIn: [raphael-rapisardi-a55790235](https://www.linkedin.com/in/raphael-rapisardi-a55790235)
