# Sleepr

A reservations service built as a **NestJS monorepo**. It's the first step toward a microservices architecture. The `reservations` app has full CRUD over MongoDB. It sits on a shared `common` library for configuration, database access and structured logging, which later services can reuse.

![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47A248?logo=mongodb&logoColor=white)

## Architecture

```
apps/
└── reservations/          # HTTP service: controller → service → repository
libs/
└── common/                # Shared across every app
    ├── config/            # @nestjs/config + Joi validation of required env vars
    ├── database/          # Mongoose connection, AbstractDocument, AbstractRepository<T>
    └── logger/            # nestjs-pino structured HTTP logging
```

- **Generic repository pattern.** `AbstractRepository<TDocument>` provides `create`, `find`, `findOne`, `findOneAndUpdate` and delete, with lean queries and consistent `NotFoundException` handling. Each service just extends it with its own model.
- **Validated configuration.** The app fails fast at startup if `MONGODB_URI` is missing.
- **Request validation.** A global `ValidationPipe` with `whitelist: true` checks DTOs using `class-validator` and `class-transformer`.
- **Structured logging.** Pino logs every HTTP request as a single line.

## API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/reservations` | Create a reservation |
| `GET` | `/reservations` | List reservations |
| `GET` | `/reservations/:id` | Get one reservation |
| `PATCH` | `/reservations/:id` | Update a reservation |
| `DELETE` | `/reservations/:id` | Delete a reservation |

Example request body:

```json
{
  "startDate": "2026-10-01",
  "endDate": "2026-10-05",
  "placeId": "123",
  "invoiceId": "493"
}
```

## Getting started

**Requirements:** Node.js 18+ and a running MongoDB instance.

```bash
npm install
echo "MONGODB_URI=mongodb://127.0.0.1/sleepr" > .env
npm run start:dev          # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run start:dev` | Run in watch mode |
| `npm run build` | Production build (webpack) |
| `npm test` | Unit tests (Jest) |
| `npm run lint` | ESLint + Prettier |

## Roadmap

- [ ] Auth service (JWT) and a user identity on reservations
- [ ] Payments and notifications services over a message transport
- [ ] Docker Compose for all services
