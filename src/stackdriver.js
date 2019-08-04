const stream = require('stream')

const fastJsonParse = require('fast-json-parse')
const split2 = require('split2')
const through2 = require('through2')
const { Logging } = require('@google-cloud/logging')

const PINO_LEVELS = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 }
// const STACKDRIVER_SEVERITIES = { default: 0, debug: 100, info: 200, notice: 300, warning: 400, error: 500, critical: 600, alert: 700, emergency: 800 }

function _jsonParser (str) {
  const result = fastJsonParse(str)
  if (result.err) return
  return result.value
}

function _levelToSeverity (level) {
  if (level === PINO_LEVELS.trace || level === PINO_LEVELS.debug) { return 'debug' }
  if (level === PINO_LEVELS.info) { return 'info' }
  if (level === PINO_LEVELS.warn) { return 'warning' }
  if (level === PINO_LEVELS.error) { return 'error' }
  if (level >= PINO_LEVELS.fatal) { return 'critical' }
  return 'default'
}

module.exports.parseJsonStream = function () {
  return split2(_jsonParser)
}

module.exports.toLogEntry = function (log, options = {}) {
  const { labels, prefix, resource } = options

  const severity = _levelToSeverity(log.level)
  let message = log.msg || severity
  message = (log.level >= PINO_LEVELS.error && log.stack) ? `${message}\n${log.stack}` : message
  message = (prefix) ? `[${prefix}] ${message}` : message

  const data = { ...log, message }
  if (data.msg) { delete data.msg }
  if (data.labels) { delete data.labels }
  if (data.httpRequest) { delete data.httpRequest }

  const entry = {
    meta: {
      resource: resource || { type: 'global' },
      severity
    },
    data
  }
  if (log.httpRequest) { entry.meta.httpRequest = log.httpRequest }
  if (labels || log.labels) {
    const optLabels = labels || {}
    const logLabels = log.labels || {}
    entry.meta.labels = { ...optLabels, ...logLabels }
  }

  return entry
}

module.exports.toLogEntryStream = function (options = {}) {
  const self = this
  return through2.obj(function transport (chunk, enc, cb) {
    const entry = self.toLogEntry(chunk, options)
    cb(null, entry)
  })
}

module.exports.toStackdriverStream = function (options = {}) {
  const { logName, projectId, credentials } = options
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS || credentials) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS || credentials
  }
  if (!projectId) { throw Error('The "projectId" argument is missing') }
  const opt = {
    logName: logName || 'pino_log',
    projectId,
    scopes: ['https://www.googleapis.com/auth/logging.write']
  }
  const log = new Logging(opt).log(opt.logName)
  const writableStream = new stream.Writable({
    objectMode: true,
    write (chunk, encoding, callback) {
      const entry = log.entry(chunk.meta, chunk.data)
      log[chunk.meta.severity](entry, callback)
    }
  })
  return writableStream
}
