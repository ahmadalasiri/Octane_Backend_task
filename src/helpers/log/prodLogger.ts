import winston, { format } from 'winston';

const logFormat = format.printf(info => {
  let message = `${info.timestamp} | ${info.level} | ${info.message}`;
  message = info.obj ? `${message} | data: ${JSON.stringify(info.obj)}` : message;
  return message;
});

const prodLogger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm' }), logFormat),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'error.log', level: 'error' })],
});

export { prodLogger };
