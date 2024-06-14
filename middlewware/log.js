const morgan = require('morgan');
const logger = require('../logger');

morgan.token('id', (req) => req.user ? req.user.id : 'guest');
morgan.token('role', (req) => req.user ? (req.user.isAdmin ? 'admin' : 'user') : 'guest');

const morganFormat = ':method :url :status :res[content-length] - :response-time ms - :id :role';

const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => logger.info(message.trim())
  }
});

const logRequest = (req, res, next) => {
  const { password, ...logDataWithoutPassword } = req.body; 
  logger.info('Request received', {
    path: req.path,
    method: req.method,
    user: req.user ? req.user.id : 'guest',
    ip: req.ip,
    body: logDataWithoutPassword,
    createByIp: req.createByIp, 
  });
  next();
};

module.exports = { morganMiddleware, logRequest };


