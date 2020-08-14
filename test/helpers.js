// const stream = require('stream')
const es = require('event-stream')
const pumpify = require('pumpify')
const sinon = require('sinon')
const pkg = require('../package.json')

const { Logging } = require('@google-cloud/logging')

module.exports.credentials = '/credentials.json'
module.exports.projectId = 'test-project'
module.exports.fallback = true
module.exports.package = pkg

module.exports.stubLogging = () => {
  return sinon.stub(Logging.prototype, 'log').callsFake(() => {
    const _log = function (entry, callback) { callback() }
    return {
      entry: function (meta, data) { return {} },
      debug: _log,
      info: _log,
      warning: _log,
      error: _log,
      critical: _log,
      default: _log
    }
  })
}

module.exports.readStreamTest = (items) => {
  return es.readArray(items)
}

module.exports.transformStreamTest = (transformStream, callback) => {
  const writableStream = es.writeArray(callback)
  const streams = (Array.isArray(transformStream)) ? transformStream : [transformStream]
  streams.push(writableStream)
  return pumpify(streams)
}
