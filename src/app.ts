import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import path from 'path';
import 'reflect-metadata';
import xss from 'xss-clean';

import env from './config/validateEnv';
import { notFound } from './domain/exceptions/NotFoundException';
import './domain/exceptions/shutdownHandler';
import { pgClient } from './infrastructure/database';
import { errorMiddleware } from './presentation/middlewares/errorHandlingMiddleware';
import { compression, cors, limiter } from './presentation/middlewares/middlewares';
import { routes } from './presentation/routes/routes';
import { Routes } from './types/routes.interface';

class App {
  public app: express.Application;
  public port: number | string;
  public env: string;
  private routes: Routes[];

  static instance: App | null = null;
  private constructor() {
    this.app = express();
    this.port = env.PORT || 8000;
    this.env = env.NODE_ENV || 'development';
    this.routes = routes;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(this.routes);
    this.initializeErrorHandling();
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  public getApp() {
    return this.app;
  }

  private connectToDatabase() {
    let client = pgClient();
    client.connect();
  }
  private initializeMiddlewares() {
    if (this.env === 'development' || this.env === 'staging') {
      const morganFmt = ':date[iso] | :remote-addr | ":method :url" :status :response-time ms';
      this.app.use(morgan(morganFmt));
    }
    if (this.env === 'production' || this.env === 'staging') this.app.enable('trust proxy'); // This will enable the app to work behind a proxy (Render, Heroku, AWS, Nginx etc.) which sets the X-Forwarded-Proto header to "https" when a request is made over HTTPS
    this.app.use(cors);
    // Set security HTTP headers to prevent XSS attacks, clickjacking etc.
    this.app.use(helmet());
    // Compress response bodies for all requests
    this.app.use(compression);
    // Limit the body of the request to 50kb to prevent DOS attacks
    this.app.use(express.json({ limit: '50kb' }));
    // Data sanitization against XSS (Cross-Site Scripting) attacks
    this.app.use(xss());
    //  Rate limiter middleware to prevent brute force attacks on the login & reset password routes
    this.app.use('/api/v1/auth/login', limiter);
    this.app.use('/api/v1/auth/reset-password', limiter);
    // Prevent HTTP Parameter Pollution attacks
    this.app.use(hpp());
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    // serve the static files (index.html)
    if (this.env !== 'production') {
      this.app.use(express.static(path.join(__dirname, '../public')));
    }
    routes.forEach(route => {
      this.app.use('/api/v1', route.router);
    });
  }
  private initializeErrorHandling() {
    this.app.use(notFound);
    this.app.use(errorMiddleware);
  }
}

export { App };
