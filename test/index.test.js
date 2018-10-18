const pinoms = require('pino-multi-stream')
const test = require('tap').test

const helpers = require('./helpers')
const tested = require('../src/index')

test('creates write stream', t => {
  t.plan(1)

  const sl = helpers.stubLogging()
  const { credentials, projectId } = helpers
  const writeStream = tested.createWriteStream({ credentials, projectId })
  writeStream.on('end', () => {
    t.ok(true)
    sl.restore()
  })
  const logger = pinoms({ streams: [writeStream] })
  logger.info('Informational message')
})
