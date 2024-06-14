const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

const logFormat = printf(({ level, message, timestamp, ...meta }) => {
  return `${timestamp} [${level}]: ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, 'logs', 'groovy.log') })
  ]
});

module.exports = logger;
