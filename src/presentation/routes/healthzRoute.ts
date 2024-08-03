import { Router } from 'express';
import { Request, Response } from 'express';

import customResponse from '../../utils/customResponse';

const path = '/healthz';
const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(customResponse({ data: null, success: true, message: 'Welcome to Rest API - 👋🌎🌍🌏' }));
});

router.get(`${path}`, (_req: Request, res: Response) => {
  res.status(200).json(customResponse({ data: null, success: true, message: 'Welcome to Rest API - 👋🌎🌍🌏' }));
});

export default router;
