import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import env from '../../config/validateEnv';

/**
 *  @description Middleware to prevent brute force attacks on the login & reset password routes
 */
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after 10 minutes',
});

/**
 * @description Middleware to handle compression of the response
 */
let compress = compression({
  level: 6, // set compression level from -1 to 9 (-1 default level, 0 no compression, 9 is the maximum compression level)
  threshold: 100 * 1024, // 100kb is the minimum size of the response before applying compression
  // filter function to determine if the response should be compressed
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }
    return compression.filter(req, res);
  },
});

/**
 * @description Middleware to handle CORS (Cross-Origin Resource Sharing)
 */
let cross: any;
if (env.NODE_ENV === 'production') {
  cross = cors({
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });
} else {
  // Allow all origins for development and staging environments
  cross = cors({ origin: true, credentials: true, exposedHeaders: ['set-cookie'] });
}

export { cross as cors, compress as compression, limiter };
