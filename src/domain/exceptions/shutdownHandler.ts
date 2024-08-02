import { server } from '../..';
import logger from '../../helpers/log';
import { pgClient } from '../../infrastructure/database';

// Graceful shutdown

// 1) Handle process kill signal
process.on('SIGINT', () => {
  logger.error('👋 SIGINT RECEIVED. Shutting down gracefully');
  server.close(() => {
    const client = pgClient();
    client
      .end()
      .then(() => {
        logger.error('PostgreSQL connection closed.');
        logger.error('💥 Process terminated!');
        process.exit(1);
      })
      .catch(err => {
        logger.error('Error closing PostgreSQL connection:', err);
        process.exit(1);
      });
  });
});

// 1- unhandled rejection - asynchronous errors
process.on('unhandledRejection', async (err: Error) => {
  logger.error(err.name, { message: err.message });
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log('error name', err.name, 'error message', err.message);

  process.exit(1);
});

// 2- uncaught exception  - synchronous errors
process.on('uncaughtException', (err: Error) => {
  logger.error(err.name, { message: err.message });
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');

  process.exit(1);
});
