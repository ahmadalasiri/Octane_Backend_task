# Octane_Backend_junior_level_task

# Getting Started

```bash

# Clone the repository
git clone https://github.com/ahmadalasiri/Octane_Backend_task.git

# Go into the repository
cd Octane_Backend_task

# Using npm 📦
npm install

# Run the migrations
npm run migration:run

# Start the server in development mode
npm run start:dev

# Using Docker compose 🐳
docker compose up

```

# Project Structure

```
octane-backend-junior-level-task/
 ├──
    migrations/
    ├── sqls/
    src/
    ├── application/
    │   ├── services/
    │   │   ├── BookService.ts
    │   │   ├── AuthService.ts
    │   │   ├── ReadingIntervalService.ts
    │   │   └── UserServies.ts
    │   └── interfaces/
    │       ├── IBookRepository.ts
    │       ├── IUserRepository.ts
    │       └── IReadingIntervalRepository.ts
    ├── config/
    │   ├── validateEnv.ts
    ├── di/
    │   └── container.ts
    ├── domain/
    │   ├── entities/
    │   │   ├── Book.ts
    │   │   ├── user.ts
    │   │   └── ReadingInterval.ts
    │   └── exceptions/
    │       ├── HttpException.ts
    │       ├── NotFoundException.ts
    │       └── ValidationError.ts
    ├── helpers/
    │   ├── log/
    │   │   ├── devLogger.ts
    │   │   ├── index.ts
    │   │   └── prodLogger.ts
    ├── infrastructure/
    │   └── database/
    │   │    ├── index.ts
    │   │    └── seeds/
    │   │        ├── seedBook.ts
    │   │        ├── seedUser.ts
    │   │        ├── index.ts
    │   │        └── seedReadingInterval.ts
    │   └── repositories/
    │       ├── BookRepository.ts
    │       ├── UserRepository.ts
    │       └── ReadingIntervalRepository.ts
    ├── presentation/
    │   ├── controllers/
    │   │   ├── BookController.ts
    │   │   ├── AuthController.ts
    │   │   ├── UserController.ts
    │   │   └── ReadingIntervalController.ts
    │   ├── routes/
    │   │   ├── bookRoutes.ts
    │   │   ├── userRoutes.ts
    │   │   ├── authRoutes.ts
    │   │   ├── index.ts
    │   │   ├── healthz.ts
    │   │   └── readingIntervalRoutes.ts
    │   └── middlewares/
    │       ├── validation/
    │       │   ├── bookValidation.ts
    │       │   ├── userValidation.ts
    │       │   ├── readingIntervalValidation.ts
    │       │   └── authValidation.ts
    │       ├── authMiddleware.ts
    │       ├── middlewares.ts
    │       └── errorHandlingMiddleware.ts
    ├── types/
    │   ├── errorResponse.interface.ts
    │   ├── response.interface.ts
    │   ├── routes.interface.ts
    │   ├── pagination.interface.ts
    │   └── xss-clean.d.ts
    ├── utils/
    │     ├── createToken.ts
    │     ├── customReponse.ts
    ├── app.ts
    ├── index.ts
    ├── .env
    ├── .gitignore
    ├── .nvrmc
    ├── .prettierrc.json
    ├── docker-compose.dev.yml
    ├── docker-compose.prod.yml
    ├── docker-compose.sta.yml
    ├── docker-compose.tes.yml
    ├── docker-compose.yml
    ├── Dockerfile
    ├── eslintrc.json
    ├── jest.config.js
    ├── LICENSE
    ├── nodemon.json
    ├── package-lock.json
    ├── package.json
    ├── .md
    ├── test.env
    ├── tsconfig.json
```
