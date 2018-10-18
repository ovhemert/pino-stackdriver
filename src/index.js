const stackdriver = require('./stackdriver')
const pumpify = require('pumpify')

module.exports.createWriteStream = ({ credentials, logName, projectId }) => {
  const parseJsonStream = stackdriver.parseJsonStream()
  const toLogEntryStream = stackdriver.toLogEntryStream()
  const toStackdriverStream = stackdriver.toStackdriverStream({ credentials, logName, projectId })
  return pumpify(parseJsonStream, toLogEntryStream, toStackdriverStream)
}
