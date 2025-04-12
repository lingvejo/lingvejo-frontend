# 🌌 Lingvejo

**Lingvejo** is a magical, story-driven language learning app where users explore new planets, uncover ancient languages, and grow through quests and adventures.

> *"Lingvejo" means "The Place of Languages" in Esperanto.*


## ✨ Features

- 🌍 Language learning through **story and exploration**
- 🧙‍♀️ NPCs, quests, settlements, and regions
- 🌌 Fantasy-style UI with a sci-fi backstory
- 📦 Monorepo structure with:
  - `frontend/`: Mobile-first app built with Next.js and Mantine
  - `backend/`: GraphQL backend powered by Hasura and PostgreSQL


## 🚀 Getting Started

### Prerequisites

- Node.js
- Docker + Docker Compose

### Setup .env Files

Before running the application, create `.env` files in both the `frontend/` and `backend/` directories with the appropriate environment variables.

#### Frontend `.env` file (`frontend/.env`)
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

### Development

```bash
# Start frontend
cd ./frontend && npm run dev
# Start backend via Docker
cd ./backend && sh deploy.sh
```


## 🪐 Contribute

This project is community-driven! Help us expand Lingvejo's universe by adding quests, improving content, or reporting bugs.

## 📜 Legal Scrolls

Before you embark on your journey, please review our enchanted scrolls:

- [Terms of Spellbinding](./TERMS_OF_SPELLBINDING.md) 🧙‍♀️
- [Privacy Spell](./PRIVACY_SPELL.md) 🔒

By entering Lingvejo, you agree to abide by the wisdom written within these scrolls, as decreed by the Wizard Council of the Galactic Magic Association.