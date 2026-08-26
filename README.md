# 📦 Inventory Management Dashboard

A full-stack **inventory, sales, and expense management dashboard** built with Next.js and Node.js. It gives a business a single place to track products and stock levels, monitor sales and purchase trends, review expenses by category, and manage users — all through a clean, responsive, dark-mode-friendly interface.

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

This project is a **monorepo** split into two independent applications:

- **`client/`** — a Next.js (App Router) dashboard UI that talks to the API via Redux Toolkit Query.
- **`server/`** — a Node.js + Express REST API backed by PostgreSQL via Prisma ORM.

The dashboard is organized around six core sections — **Dashboard, Inventory, Products, Users, Expenses,** and **Settings** — reachable from a collapsible sidebar, with full light/dark theme support.

## ✨ Key Features

- **📊 Dashboard Overview** — At-a-glance KPI cards for sales, purchases, and expense summaries, plus a popular products widget for quick insight into store performance.
- **📋 Inventory Table** — A sortable, filterable data grid (powered by MUI X Data Grid) listing every product with price, rating, and current stock quantity.
- **🛍️ Product Catalog** — A searchable, card-based product list with a **"Create Product"** modal for adding new items (name, price, stock quantity, and rating) on the fly.
- **👥 User Management** — A data grid view of all registered users and their contact details.
- **💰 Expense Analytics** — An interactive pie chart breaking down expenses by category, with category and date-range filters.
- **⚙️ User Settings** — A settings panel for managing account preferences such as notifications, language, and display options.
- **🌓 Dark Mode** — App-wide light/dark theme toggle backed by Redux state.
- **📱 Responsive, Collapsible Sidebar** — A layout that adapts smoothly from mobile to desktop.

## 📸 Screenshots

> Add your screenshots to a `screenshots/` folder at the root of the repo, then reference them below (the filenames are just a suggestion — match them to whatever you save).

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Product List
![Product List](./screenshots/products.png)

### Add Product
![Add Product](./screenshots/add-product.png)

### Inventory
![Inventory](./screenshots/inventory.png)

### Users
![Users](./screenshots/users.png)

### Expenses
![Expenses](./screenshots/expenses.png)

### User Settings
![User Settings](./screenshots/settings.png)

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

## 🗂 Project Structure

```
Inventory-Management-Dashboard/
├── client/                    # Next.js frontend
│   └── src/app/
│       ├── (components)/      # Shared UI: Navbar, Sidebar, Header, Rating
│       ├── dashboard/         # Dashboard cards & KPIs
│       ├── inventory/         # Inventory data grid
│       ├── products/          # Product list + Create Product modal
│       ├── users/             # Users data grid
│       ├── expenses/          # Expense pie chart & filters
│       ├── settings/          # User settings panel
│       └── state/             # Redux slices + RTK Query API definitions
│
└── server/                    # Express backend
    ├── src/
    │   ├── controllers/       # Request handlers (dashboard, product, user, expense)
    │   └── routes/            # Express route definitions
    └── prisma/
        ├── schema.prisma      # Database schema
        ├── migrations/        # Prisma migration history
        └── seedData/          # Sample JSON data for seeding
```

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

## 📜 Available Scripts

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

Ideas for taking this project further:

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

*This project currently has no license file. Consider adding one (e.g., [MIT](https://choosealicense.com/licenses/mit/)) if you plan to share or open this repository up for contributions.*
