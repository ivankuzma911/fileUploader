const winston = require('winston');

const logFormat = winston.format.printf(info => `${new Date().toISOString()} - ${info.level}: ${JSON.stringify(info.message, null, 4)}\n`);

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  ],
});

module.exports = logger;
