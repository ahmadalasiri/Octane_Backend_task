import { createServer } from 'http';
import 'reflect-metadata';

import { App } from './app';
import env from './config/validateEnv';
import logger from './helpers/log';

// Setup app
let app = App.getInstance();
// Setup http server
let client = app.getApp();
let server = createServer(client);
server.listen(env.PORT).on('listening', () => {
  logger.info(`🚀 App listening in ${env.NODE_ENV} mode on the port ${env.PORT}`);
});

export { server };
