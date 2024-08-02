# Octane_Backend_junior_level_task

# Project Structure

```
src/
 ├── application/
 │   ├── use-cases/
 │   │   ├── SubmitReadingIntervalUseCase.ts
 │   │   └── GetTopRecommendedBooksUseCase.ts
 │   └── interfaces/
 │       ├── IBookRepository.ts
 │       └── IReadingIntervalRepository.ts
 ├── domain/
 │   ├── entities/
 │   │   ├── Book.ts
 │   │   └── ReadingInterval.ts
 │   └── services/
 │       └── BookService.ts
 │   └── exceptions/
 │       ├── CustomError.ts
 │       ├── HttpException.ts
 │       ├── NotFoundException.ts
 │       └── ValidationError.ts
 ├── infrastructure/
 │   ├── repositories/
 │   │   ├── BookRepository.ts
 │   │   └── ReadingIntervalRepository.ts
 │   └── database/
 │       ├── index.ts
 │       └── seeds.ts
 ├── presentation/
 │   ├── controllers/
 │   │   ├── BookController.ts
 │   │   └── ReadingIntervalController.ts
 │   ├── routes/
 │   │   ├── bookRoutes.ts
 │   │   └── readingIntervalRoutes.ts
 │   └── middlewares/
 │       ├── authMiddleware.ts
 │       └── errorHandlingMiddleware.ts
 ├── config/
 │   ├── index.ts
 │   └── db.ts
 ├── di/
 │   └── container.ts
 ├── types/
 │   ├── errorResponse.interface.ts
 │   ├── response.interface.ts
 │   ├── routes.interface.ts
 │   ├── pagination.interface.ts
 │   └── xss-clean.d.ts
 ├── utils/
 │   └── customResponse.ts
 ├── app.ts
 ├── server.ts
 └── README.md

```
