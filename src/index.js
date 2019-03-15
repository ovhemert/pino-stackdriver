const stackdriver = require('./stackdriver')
const pumpify = require('pumpify')

module.exports.createWriteStream = ({ credentials, logName, projectId, resource }) => {
  const parseJsonStream = stackdriver.parseJsonStream()
  const toLogEntryStream = stackdriver.toLogEntryStream({ resource })
  const toStackdriverStream = stackdriver.toStackdriverStream({ credentials, logName, projectId })
  return pumpify(parseJsonStream, toLogEntryStream, toStackdriverStream)
}
