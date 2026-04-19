# Smart Ledger

A full-stack personal finance tracking application built with React, TypeScript, and Spring Boot.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router DOM

### Backend

- Java 17
- Spring Boot 3.2
- Spring Data JPA
- PostgreSQL

## Project Structure

```
smart-ledger/
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
├── backend/           # Spring Boot backend
│   ├── src/
│   └── pom.xml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven 3.8+
- PostgreSQL (optional, uses in-memory H2 for development)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
mvn spring-boot:run
```

## Features

- User authentication (Login, Register, Forgot Password)
- Transaction management (Income/Expense tracking)
- Debt/Credit tracking
- Dashboard with analytics

## License

MIT
