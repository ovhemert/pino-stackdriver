# pino-stackdriver

[![Travis](https://img.shields.io/travis/com/ovhemert/pino-stackdriver.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/pino-stackdriver)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/pino-stackdriver.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/pino-stackdriver)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d259e1e01a09432398c75c2127aeeaab)](https://app.codacy.com/app/ovhemert/pino-stackdriver?utm_source=github.com&utm_medium=referral&utm_content=ovhemert/pino-stackdriver&utm_campaign=Badge_Grade_Dashboard)
[![Known Vulnerabilities](https://snyk.io/test/npm/pino-stackdriver/badge.svg)](https://snyk.io/test/npm/pino-stackdriver)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/pino-stackdriver/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/pino-stackdriver?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/pino-stackdriver.svg)](https://greenkeeper.io/)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

This module provides a "transport" for [pino][pino] that forwards messages to the [Google Stackdriver][stackdriver] log service through it's API.

![Screenshot](docs/images/stackdriver-screenshot.png)

You should install `pino-stackdriver` globally for ease of use:

```bash
$ npm install --production -g pino-stackdriver
```

## Requirements

This package internally uses the Google cloud logging library to call the Stackdriver Logging API. To be able to log to Stackdriver, some setup is needed on the Google Cloud platform.

Create a service account on the page [Stackdriver Logging Client Libraries](https://cloud.google.com/logging/docs/reference/libraries). This downloads a JSON file with the credentials required.

## Installation

To use globally from command line:

```bash
$ npm install -g pino-stackdriver
```

To include as a library in your project:

```bash
$ npm install pino-stackdriver
```

## CLI

Want to use `pino-stackdriver` from the CLI?
See the [CLI](./docs/CLI.md) documentation for details.

## API

Want to use `pino-stackdriver` as a library in your project?
See the [API](./docs/API.md) documentation for details.

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=github)](https://github.com/ovhemert)
[![Web](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=nextdoor)](https://ovhemert.dev)

## Contributing

If you would like to help out with some code, check the [details](./docs/CONTRIBUTING.md).

Not a coder, but still want to support? Have a look at the options available to [donate](https://ovhemert.dev/donate).

## License

Licensed under [MIT](./LICENSE).

[pino]: https://www.npmjs.com/package/pino
[stackdriver]: https://cloud.google.com/logging/
