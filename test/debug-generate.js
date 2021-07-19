const pinoms = require('pino-multi-stream')

const logger = pinoms({
  streams: [{ stream: process.stdout }]
})
logger.level = 'trace'

logger.trace('trace message')
logger.debug('debug message')
logger.info('info message')
logger.warn('warn message')
logger.error(new Error('error message'))
logger.fatal('fatal message')

logger.trace({ labels: { foo: 'bar' } }, 'trace message')
logger.error(new Error('things got bad'), 'error message')
