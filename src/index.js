const stackdriver = require('./stackdriver')
const pumpify = require('pumpify')

module.exports.createWriteStream = ({
  credentials,
  logName,
  projectId,
  fallback,
  resource,
  keys
}) => {
  const parseJsonStream = stackdriver.parseJsonStream()
  const toLogEntryStream = stackdriver.toLogEntryStream({ resource, keys })
  const toStackdriverStream = stackdriver.toStackdriverStream({ credentials, logName, projectId, fallback })
  return pumpify(parseJsonStream, toLogEntryStream, toStackdriverStream)
}
