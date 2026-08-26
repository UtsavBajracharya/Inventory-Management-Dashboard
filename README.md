# 📦 Inventory Management Dashboard

A full-stack **inventory, sales, and expense management dashboard** built with Next.js, React.js and Redux. The backend is powered by Node.js, using Prisma as the ORM to facilitate database interactions. It gives a business a single place to track products and stock levels, monitor sales and purchase trends, review expenses by category, and manage users through a clean and responsive along with dark-mode-friendly interface.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white">
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Redux Toolkit" src="https://img.shields.io/badge/Redux%20Toolkit-RTK%20Query-764ABC?logo=redux&logoColor=white">
</p>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Data Model](#-data-model)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 🧾 Overview

- **`client/`** — a Next.js (App Router) dashboard UI that talks to the API via Redux Toolkit Query.
- **`server/`** — a Node.js + Express REST API backed by PostgreSQL via Prisma ORM.

The dashboard is organized around six main sections — **Dashboard, Inventory, Products, Users, Expenses,** and **Settings** accessed from the sidebar.

## ✨ Key Features

- **📊 Dashboard Overview** — KPI cards for sales, purchases, and expense summaries, plus a popular products widget for quick insight into store performance.
- **📋 Inventory Table** — A sortable, filterable data grid (powered by MUI X Data Grid) listing every product with price, rating, and current stock quantity.
- **🛍️ Product Catalog** — A searchable, card-based product list with a **"Create Product"** modal for adding new items (name, price, stock quantity, and rating) on the fly.
- **👥 User Management** — A data grid view of all registered users and their contact details.
- **💰 Expense Analytics** — An interactive pie chart breaking down expenses by category, with category and date-range filters.
- **⚙️ User Settings** — A settings panel for managing account preferences such as notifications, language, and display options.
- **🌓 Dark Mode** — Light/dark theme toggle backed by Redux state.
- **📱 Responsive, Collapsible Sidebar** — A layout that adapts smoothly from mobile to desktop.

## 📸 Screenshots

### Dashboard
<img width="2561" height="1458" alt="Inventory-Manangement-Dashboard" src="https://github.com/user-attachments/assets/b98b34ae-a3b5-4b01-af4f-a968db9c3c6e" />

### Product List
<img width="1920" height="917" alt="Inventory-Manangement-Dashboard-products" src="https://github.com/user-attachments/assets/860a314f-f9d5-43c6-a85c-aeb5020c2eb2" />

### Add Product
<img width="1920" height="917" alt="Inventory-Manangement-Dashboard-products" src="https://github.com/user-attachments/assets/a35295df-2939-451d-8092-0b7a940c2e89" />

### Inventory
<img width="2561" height="1356" alt="Inventory-Manangement-Dashboard-Inventory" src="https://github.com/user-attachments/assets/097b2964-e49c-4cd8-ba11-6c30d7c924fe" />

### Expenses
<img width="2561" height="1356" alt="Inventory-Manangement-Dashboard-expenses" src="https://github.com/user-attachments/assets/0df7d209-d010-4a46-a1e4-2a793b62860c" />

### Settings
<img width="1920" height="917" alt="Inventory-Manangement-Dashboard-settings" src="https://github.com/user-attachments/assets/291a2029-c3a3-4bde-8025-4976dbab934e" />

## 🛠 Tech Stack

**Frontend (`client/`)**

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) with [React 19](https://react.dev/) & TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/), [tw-colors](https://www.npmjs.com/package/tw-colors) |
| State Management | [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for global state and data fetching |
| Persistence | [redux-persist](https://github.com/rt2zz/redux-persist) |
| UI Components | [Material UI (MUI)](https://mui.com/) & [MUI X Data Grid](https://mui.com/x/react-data-grid/) |
| Data Visualization | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Utilities | Axios, UUID, Numeral |

**Backend (`server/`)**

| Category | Technology |
|---|---|
| Runtime | [Node.js](https://nodejs.org/) |
| Framework | [Express 5](https://expressjs.com/) with TypeScript |
| ORM | [Prisma](https://www.prisma.io/) (`@prisma/client`, `@prisma/adapter-pg`) |
| Database | [PostgreSQL](https://www.postgresql.org/) |
| Middleware | Helmet (security headers), CORS, Morgan (logging), body-parser |
| Dev Tooling | tsx, ts-node, nodemon, concurrently, rimraf |


## 🧬 Data Model

The schema is defined in `server/prisma/schema.prisma` and covers:

| Model | Purpose |
|---|---|
| `Users` | Registered users (id, name, email) |
| `Products` | Product catalog (name, price, rating, stock quantity) |
| `Sales` | Individual sale transactions linked to a product |
| `Purchases` | Individual purchase/restock transactions linked to a product |
| `Expenses` | Business expenses by category |
| `SalesSummary` / `PurchaseSummary` / `ExpenseSummary` | Pre-aggregated totals used to power the dashboard cards |
| `ExpenseByCategory` | Category-level breakdown feeding the Expenses pie chart |

Sample data for every model lives in `server/prisma/seedData/` and can be loaded with a single seed script.

## 🔌 API Reference

The Express server exposes the following REST endpoints (base URL defaults to `http://localhost:5000`):

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/dashboard` | Aggregated data for the dashboard (popular products, sales/purchase/expense summaries) |
| `GET` | `/products` | List all products (supports a `search` query parameter) |
| `POST` | `/products` | Create a new product |
| `GET` | `/users` | List all users |
| `GET` | `/expenses` | Get expenses grouped by category |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [PostgreSQL](https://www.postgresql.org/) database (local install, Docker, or a hosted service such as Neon, Supabase, or Railway)

### 1. Clone the repository

```bash
git clone https://github.com/UtsavBajracharya/Inventory-Management-Dashboard.git
cd Inventory-Management-Dashboard
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
PORT=5000
```

Run migrations and seed the database with sample data:

```bash
npx prisma migrate dev
npm run seed
```

Start the API server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

### 3. Set up the frontend

In a new terminal:

```bash
cd client
npm install
```

Create a `.env.local` file inside `client/`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the dashboard.

## 📜 Scripts

**Client**

| Script | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the app for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

**Server**

| Script | Description |
|---|---|
| `npm run dev` | Build and run the API with hot-reload (tsc watch + nodemon) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Build and run the compiled production server |
| `npm run seed` | Seed the database with sample data from `prisma/seedData/` |

## 🗺 Roadmap

Ideas for taking this project further(on process):

- Authentication and role-based access control
- Edit/delete actions for products and inventory records
- Persisting the Settings page to the backend (currently local UI state)
- Dedicated Sales and Purchases management screens
- Automated testing (unit/integration/E2E)
- Docker Compose setup for one-command local development
- CI/CD pipeline for automated builds and deployments

## 👤 Author

**Utsav Bajracharya**
GitHub: [@UtsavBajracharya](https://github.com/UtsavBajracharya)

---

