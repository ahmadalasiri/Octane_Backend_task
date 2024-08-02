import { container } from 'tsyringe';

import HealthzRoute from './healthz.route';

// Setup routes
let healthzRoute = container.resolve(HealthzRoute);

export const routes = [healthzRoute];
