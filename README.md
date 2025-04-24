# README.md

## halioCRM

**A powerful CRM for distributed data collection, payment aggregation, and AI-powered insights.**

### 🚀 What is halioCRM?
halioCRM is a modular CRM system designed for organizations with multiple data-collection centers or networks. It simplifies the complexities of structured or unstructured node relationships (hierarchical, parallel, hybrid), supports real-time aggregation, and enables embedded payments, compliance, and AI analysis.

### ✨ Key Features
- Collect data from various sources like attendance, prices, sales, weather, and more.
- Automatically aggregate inputs across node structures.
- Embedded multi-level payment and revenue tracking.
- Compliance-ready dashboards and analytics.
- AI-powered insights based on collected data.

### 🧱 Tech Stack
- **Backend**: Node.js
- **Frontend**: Next.js
- **Database**: MongoDB
- **Cache**: Redis
- **Containerization**: Docker

### 🔧 Setup Instructions
```bash
git clone https://github.com/fadebowaley/haloCRM.git
cd halioCRM
cp .env.example .env
npm install
docker-compose up -d
```

### ▶️ Usage
Access the app via `http://localhost:3000`

To send a sample data entry:
```bash
curl -X POST http://localhost:3000/api/data -d '{"category": "attendance", "value": 300, "nodeId": "A123"}' -H "Content-Type: application/json"
```

---
# LICENSE (MIT)

MIT License

Copyright (c) 2025 Ademola Francis Adebowale

Permission is hereby granted, free of charge, to any person obtaining a copy of this software... [MIT license text continues]

---
# VISION.md

## 🌍 Vision for halioCRM

halioCRM envisions a future where structured and unstructured businesses can capture, process, and act on data regardless of their size or network complexity. Our goal is to be the **central nervous system** for any data-driven business structure—from faith-based networks to decentralized field operations.

### Ideal Users:
- Multi-location small to medium businesses
- NGOs and field data collection teams
- Educational networks and research teams
- Enterprise resellers and distributors

### Long-Term Goal:
To build a modular SaaS platform with category-specific data modules (attendance, sales, weather, etc.), each powered by embedded AI and analytics.

---
# CONTRIBUTING.md

## 🤝 How to Contribute

We love contributions from the community! Here’s how to get started:

### 📦 Clone the Repository
```bash
git clone https://github.com/fadebowaley/haloCRM.git
```

### 🌿 Branch Naming
- Feature: `feature/module-name`
- Bugfix: `bugfix/issue-description`

### 🔍 Code Style & Linting
- Use **Prettier** for formatting
- Use **ESLint** for linting JavaScript/TypeScript code

### ✅ Testing
Run unit tests with:
```bash
npm test
```

### 📝 Commit Style
Follow [Conventional Commits](https://www.conventionalcommits.org/)

### 🔄 Pull Requests
- All changes must go through a pull request
- PRs must pass all CI checks

---
# .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:latest
        ports:
          - 27017:27017
      redis:
        image: redis:latest
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run Lint
        run: npm run lint

      - name: Run Tests
        run: npm test
