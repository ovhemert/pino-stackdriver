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
const logger = pinoms({ streams: [{ stream: writeStream }] })
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
```

#### credentials

Type: `String` or `{ client_email: String, private_key: String }` *(optional)*

Full path to the JSON file containing the Google Service Credentials,
you can also use an object parameter with the client_email and the private_key instead of the path. Defaults to the GOOGLE_APPLICATION_CREDENTIALS environment variable. At least one has to be available.


#### projectId

Type: `String` *(required)*

The name of the project.

#### logName

Type: `String` *(optional)*

The name of the log. Defaults to `"pino_log"`.

#### resource

Type: `{ type: String, labels: Object }` *(optional)*

The resource to send logs to. Defaults to `{ type: "global" }`.

#### keys

Type: `{ [key]: key }` *(optional)*

Customize additional fields to pull from log messages and include in meta. Currently
supports `httpRequest`, `trace`. Defaults to `{ httpRequest: "httpRequest" }`.

#### fallback

Type: Boolean *(optional)*

Set the gRPC fallback option for the Google Stackdriver API.

## Prefixing messages

Prefixing message is supported via a `prefix` property from the log data:

```js
logger.info({ prefix: 'foo' }, 'Info message')
logger.child({ prefix: 'foo' }).info('Info message')
```

Will send the following JSON payload to Stackdriver:

```json
{
  "prefix": "foo",
  "message": "[foo] Info message"
  // ...
}
```