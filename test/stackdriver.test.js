const pinoms = require('pino-multi-stream')
const test = require('tap').test

const helpers = require('./helpers')
const tested = require('../src/stackdriver')

test('parses pino message in stream', t => {
  t.plan(2)

  const parseJsonStream = tested.parseJsonStream()
  const writeStream = helpers.transformStreamTest(parseJsonStream, (err, result) => {
    if (err) { t.fail(err.message) }
    t.ok(result.length === 1)
    t.ok(result[0].level === 30)
  })

  const logger = pinoms({ streams: [writeStream] })
  logger.info('Informational message')
  writeStream.end()
})

test('does not parse invalid json in stream', t => {
  t.plan(1)

  const parseJsonStream = tested.parseJsonStream()
  const writeStream = helpers.transformStreamTest(parseJsonStream, (err, result) => {
    if (err) { t.fail(err.message) }
    t.ok(result.length === 0)
  })
  const readStream = helpers.readStreamTest(['invalid json'])
  readStream.pipe(writeStream)
})

test('transforms default log entry levels', t => {
  t.plan(6)

  const logs = [
    { level: 10, time: 1532081790710, msg: 'trace message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 },
    { level: 20, time: 1532081790720, msg: 'debug message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 },
    { level: 30, time: 1532081790730, msg: 'info message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 },
    { level: 40, time: 1532081790740, msg: 'warning message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 },
    { level: 50, time: 1532081790750, msg: 'error message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', type: 'Error', stack: 'Error: error message', v: 1 },
    { level: 60, time: 1532081790760, msg: 'fatal message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  ]
  const entries = logs.map(log => {
    return tested.toLogEntry(log)
  })
  t.ok(entries[0].meta.severity === 'debug')
  t.ok(entries[1].meta.severity === 'debug')
  t.ok(entries[2].meta.severity === 'info')
  t.ok(entries[3].meta.severity === 'warning')
  t.ok(entries[4].meta.severity === 'error')
  t.ok(entries[5].meta.severity === 'critical')
})

test('transforms custom log entry level', t => {
  t.plan(1)

  const log = { level: 35, time: 1532081790735, msg: 'custom level message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  const entry = tested.toLogEntry(log)
  t.ok(entry.meta.severity === 'default')
})

test('prefixes log entry message', t => {
  t.plan(1)

  const log = { level: 30, time: 1532081790730, msg: 'info message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  const entry = tested.toLogEntry(log, { prefix: 'INFO' })
  t.ok(entry.data.message.startsWith('[INFO] '))
})

test('adds labels to log entry message', t => {
  t.plan(5)

  let log = { level: 30, time: 1532081790730, labels: { foo: 'bar' }, pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  let entry = tested.toLogEntry(log, { labels: { a: 'b' } })
  t.ok(entry.meta.severity === 'info')
  t.ok(entry.meta.labels.a === 'b')
  t.ok(entry.meta.labels.foo === 'bar')

  log = { level: 30, time: 1532081790730, msg: 'info message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  entry = tested.toLogEntry(log, { labels: { a: 'b' } })
  t.ok(entry.meta.severity === 'info')

  log = { level: 30, time: 1532081790730, labels: { foo: 'bar' }, pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  entry = tested.toLogEntry(log)
  t.ok(entry.meta.severity === 'info')
})

test('adds httpRequest to log entry message', t => {
  t.plan(2)

  const log = { level: 30, time: 1532081790730, httpRequest: { url: 'http://localhost/' }, pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  const entry = tested.toLogEntry(log)
  t.ok(entry.meta.severity === 'info')
  t.ok(entry.meta.httpRequest.url === 'http://localhost/')
})

test('transforms log to entry in stream', t => {
  t.plan(3)

  const parseJsonStream = tested.parseJsonStream()
  const toLogEntryStream = tested.toLogEntryStream()
  const writeStream = helpers.transformStreamTest([parseJsonStream, toLogEntryStream], (err, result) => {
    if (err) { t.fail(err.message) }
    t.ok(result.length === 1)
    t.ok(result[0].meta.severity === 'info')
    t.deepEquals(result[0].meta.resource, { type: 'global' })
  })
  const entry = { level: 30, time: 1532081790743, msg: 'info message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  const input = `${JSON.stringify(entry)}\n`
  const readStream = helpers.readStreamTest([input])
  readStream.pipe(writeStream)
})

test('transforms log to entry with custom resource in stream', t => {
  t.plan(3)

  const resource = { type: 'test', labels: { test: 'test' } }
  const parseJsonStream = tested.parseJsonStream()
  const toLogEntryStream = tested.toLogEntryStream({ resource })
  const writeStream = helpers.transformStreamTest([parseJsonStream, toLogEntryStream], (err, result) => {
    if (err) { t.fail(err.message) }
    t.ok(result.length === 1)
    t.ok(result[0].meta.severity === 'info')
    t.deepEquals(result[0].meta.resource, { type: 'test', labels: { test: 'test' } })
  })
  const entry = { level: 30, time: 1532081790743, msg: 'info message', pid: 9118, hostname: 'Osmonds-MacBook-Pro.local', v: 1 }
  const input = `${JSON.stringify(entry)}\n`
  const readStream = helpers.readStreamTest([input])
  readStream.pipe(writeStream)
})

test('logs to stackdriver', t => {
  t.plan(1)
  const sl = helpers.stubLogging()

  const { credentials, projectId } = helpers
  const writeStream = tested.toStackdriverStream({ credentials, projectId })
  writeStream.on('finish', () => {
    t.ok(true)
    sl.restore()
  })
  const entry = { meta: { resource: { type: 'global' }, severity: 'info' }, data: { message: 'Info message' } }
  const readStream = helpers.readStreamTest([entry])
  readStream.pipe(writeStream)
})

test('works without passing credentials', t => {
  t.plan(1)

  const { projectId } = helpers
  try {
    delete process.env.GOOGLE_APPLICATION_CREDENTIALS
    tested.toStackdriverStream({ projectId })
    t.ok(true)
  } catch (err) {
    t.fail('Should not have thrown')
  }
})

test('throws on missing projectId', t => {
  t.plan(1)

  const { credentials } = helpers
  try {
    tested.toStackdriverStream({ credentials })
    t.fail('Should throw on missing projectId')
  } catch (err) {
    t.ok(true)
  }
})

test('throws on missing options', t => {
  t.plan(1)

  try {
    tested.toStackdriverStream()
    t.fail('Should throw on missing options')
  } catch (err) {
    t.ok(true)
  }
})
