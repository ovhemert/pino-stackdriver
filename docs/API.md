# API

The library exposes a function to write directly to Stackdriver from your own application. The example below shows how this can be done using [pino-multi-stream](https://github.com/pinojs/pino-multi-stream).

Example:

```js
const stackdriver = require('pino-stackdriver')
const pinoms = require('pino-multi-stream')
// create the stackdriver destination stream
const credentials = '/credentials.json'
const projectId = 'my-project'
const writeStream = stackdriver.createWriteStream({ credentials, projectId })
// create pino loggger
const logger = pinoms({ streams: [writeStream] })
// log some events
logger.info('Informational message')
logger.error(new Error('things got bad'), 'error message')
```

## Functions

### createWriteStream

The `createWriteStream` function creates a writestream that `pino-multi-stream` can use to send logs to.

Example:

```js
const writeStream = stackdriver.createWriteStream({
  credentials: '/credentials.json',
  projectId: 'my-project'
})
````

#### credentials

Type: `String` *(required)*

Full path to the JSON file containing the Google Service Credentials.

#### projectId

Type: `String` *(required)*

The name of the project.

