# pino-stackdriver

[![Travis](https://img.shields.io/travis/com/ovhemert/pino-stackdriver.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/pino-stackdriver)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/pino-stackdriver.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/pino-stackdriver)
[![Dependencies](https://img.shields.io/david/ovhemert/pino-stackdriver.svg)](https://david-dm.org/ovhemert/pino-stackdriver)
[![Known Vulnerabilities](https://snyk.io/test/npm/pino-stackdriver/badge.svg)](https://snyk.io/test/npm/pino-stackdriver)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/pino-stackdriver/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/pino-stackdriver?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/pino-stackdriver.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/pino-stackdriver.svg)](https://www.npmjs.com/package/pino-stackdriver)
[![npm](https://img.shields.io/npm/dm/pino-stackdriver.svg)](https://www.npmjs.com/package/pino-stackdriver)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

This module provides a "transport" for [pino][pino] that forwards messages to the [Google Stackdriver][stackdriver] log service through it's API.

You should install `pino-stackdriver` globally for ease of use:

```bash
$ npm install --production -g pino-stackdriver
```

## Usage

Given an application `foo` that logs via [pino][pino], a stackdriver log project `bar` and credentials in the file `/credentials.json`, you would use `pino-stackdriver` like so:

```bash
$ node foo | pino-stackdriver --project bar --credentials /credentials.json
```

## Options

You can pass the following options via cli arguments:

| Short command | Full command | Description |
| ------------- | ------------ |-------------|
| -V | --version | Output the version number |
| -p | --project &lt;project&gt; | Your Google Cloud Platform project ID (or use env var PROJECT_ID) |
| -c | --credentials &lt;credentials&gt; | The file path of the JSON file that contains your service account key (or use env var GOOGLE_APPLICATION_CREDENTIALS) |
| -h | --help | Output usage information |

## Maintainers

**Osmond van Hemert**

[![Github](https://img.shields.io/badge/style-github-333333.svg?logo=github&logoColor=white&label=)](https://github.com/ovhemert)
[![NPM](https://img.shields.io/badge/style-npm-333333.svg?logo=npm&logoColor=&label=)](https://www.npmjs.com/~ovhemert)
[![Twitter](https://img.shields.io/badge/style-twitter-333333.svg?logo=twitter&logoColor=&label=)](https://twitter.com/osmondvanhemert)
[![Web](https://img.shields.io/badge/style-website-333333.svg?logoColor=white&label=&logo=diaspora)](https://www.osmondvanhemert.nl)

## Contributing

See the [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file for details.

## Donations

Want to help me out by giving a donation? Check out these options:

[![Patreon](https://img.shields.io/badge/style-patreon-333333.svg?logo=patreon&logoColor=&label=)](https://www.patreon.com/ovhemert)
[![Coinbase](https://img.shields.io/badge/style-bitcoin-333333.svg?logo=bitcoin&logoColor=&label=)](https://commerce.coinbase.com/checkout/fd177bf0-a89a-481b-889e-22bfce857b75)
[![PayPal](https://img.shields.io/badge/style-paypal-333333.svg?logo=paypal&logoColor=&label=)](https://www.paypal.me/osmondvanhemert)
[![Ko-fi](https://img.shields.io/badge/style-coffee-333333.svg?logo=ko-fi&logoColor=&label=)](http://ko-fi.com/ovhemert)

## License

Licensed under [MIT](./LICENSE).

[pino]: https://www.npmjs.com/package/pino
[stackdriver]: https://cloud.google.com/logging/
