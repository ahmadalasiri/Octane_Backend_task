import { Router } from 'express';
import { Request, Response } from 'express';

import { Routes } from '../../types/routes.interface';
import customResponse from '../../utils/customResponse';

class HealthzRoute implements Routes {
  public path = '/healthz';
  public router = Router();

  constructor() {
    this.initializerRoutes();
  }
  private initializerRoutes() {
    this.router.get('/', (_req: Request, res: Response) => {
      res.status(200).json(customResponse({ data: null, success: true, message: 'Welcome to Rest API - 👋🌎🌍🌏' }));
    });

    this.router.get(`${this.path}`, (_req: Request, res: Response) => {
      res.status(200).json(customResponse({ data: null, success: true, message: 'Welcome to Rest API - 👋🌎🌍🌏' }));
    });
  }
}

export default HealthzRoute;
