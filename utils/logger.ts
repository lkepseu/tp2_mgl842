// util/logger.ts
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info', // 'error', 'warn', 'info', 'verbose', 'debug', 'silly'
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console(), // Output to stdout/stderr → visible in Vercel Logs
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // capture the error logs
    new transports.File({ filename: 'logs/combined.log' }) // capture all logs
  ],
  exitOnError: false
});

export default logger;
