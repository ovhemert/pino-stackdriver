# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Changes are grouped by:
`Added` for new features
`Changed` for changes in existing functionality
`Deprecated` for soon-to-be removed features
`Removed` for now removed features
`Fixed` for any bug fixes
`Security` in case of vulnerabilities

## [Unreleased](https://github.com/ovhemert/pino-stackdriver/compare/v3.0.0...HEAD)

- ...

## [3.0.0](https://github.com/ovhemert/pino-stackdriver/compare/v2.1.1...v3.0.0)

### Added

- Support passing credentials object parameter by [@jhonny111s](https://github.com/jhonny111s)
- Testing on Node v16.x by [@ovhemert](https://github.com/ovhemert)

### Changed

- Better support for batching log entries passed in at higher volume by [@ovhemert](https://github.com/ovhemert)

### Fixed

- Fix implementation of prefixing log messages by [@avaly](https://github.com/avaly)

### Removed

- Node v10.x support by [@ovhemert](https://github.com/ovhemert)

## [2.1.1](https://github.com/ovhemert/pino-stackdriver/compare/v2.1.0...v2.1.1)

### Added

- Fallback option for Google Logging API by [@slhck](https://github.com/slhck)

## [2.1.0](https://github.com/ovhemert/pino-stackdriver/compare/v2.0.0...v2.1.0)

### Added

- CLI options to sync up with API by [@Boelensman1](https://github.com/Boelensman1)
- Support for custom http request keys by [@bobheadxi](https://github.com/bobheadxi)

### Security

- Fixed "@google-cloud/logging" vulnerability by upgrading dependencies by [@ovhemert](https://github.com/ovhemert)

## [2.0.0](https://github.com/ovhemert/pino-stackdriver/compare/v1.3.0...v2.0.0)

### Added

- Testing on Node v13.x by [@ovhemert](https://github.com/ovhemert)

### Removed

- Node v8.x support by [@ovhemert](https://github.com/ovhemert)

## [1.3.0](https://github.com/ovhemert/pino-stackdriver/compare/v1.2.10...v1.3.0) - 2019-12-10

### Added

- Changelog by [@ovhemert](https://github.com/ovhemert)
- Prefer `message` field if `msg` is absent for better Bunyan compatibility by [p-fedyukovich](https://github.com/p-fedyukovich)

### Changed

- CLI credentials now optional to support GCE service account with permissions by [@ovhemert](https://github.com/ovhemert)

### Removed

- Obsolete Snyk after dependency upgrades by [@ovhemert](https://github.com/ovhemert)

## [1.2.10](https://github.com/ovhemert/pino-stackdriver/compare/v1.2.7...v1.2.10) - 2019-11-19

### Security

- Fixed "https-proxy-agent" vulnerability (through google cloud logging package) by upgrading dependencies by [@ovhemert](https://github.com/ovhemert)

## [1.2.7](https://github.com/ovhemert/pino-stackdriver/compare/v1.2.6...v1.2.7) - 2019-08-04

### Security

- Fixed "lodash" vulnerability by upgrading dependencies by [@ovhemert](https://github.com/ovhemert)

## [1.2.6](https://github.com/ovhemert/pino-stackdriver/compare/v1.2.3...v1.2.6) - 2019-06-25

### Added

- CI testing on Windows by [@ovhemert](https://github.com/ovhemert)

## [1.2.3](https://github.com/ovhemert/pino-stackdriver/compare/v1.2.2...v1.2.3) - 2019-04-27

### Added

- Tests to provide Node.js v12.x support by [@ovhemert](https://github.com/ovhemert)

## [1.2.2](https://github.com/ovhemert/pino-stackdriver/compare/v1.2.0...v1.2.2) - 2019-04-16

### Changed

- Make credentials optional, as they're not always required by [@mjwwit](https://github.com/mjwwit)

## [1.2.0](https://github.com/ovhemert/pino-stackdriver/compare/v1.1.0...v1.2.0) - 2019-03-15

### Added

- Linting and code quality checks by [@ovhemert](https://github.com/ovhemert)
- Option to specify monitoring resources by [@mjwwit](https://github.com/mjwwit)
- Typescript types by [@mjwwit](https://github.com/mjwwit)

## [1.1.0](https://github.com/ovhemert/pino-stackdriver/compare/v1.0.3...v1.1.0) - 2018-12-24

### Added

- All pino message properties to output payload by [@ovhemert](https://github.com/ovhemert)
- CI testing on OSX by [@ovhemert](https://github.com/ovhemert)

## [1.0.3](https://github.com/ovhemert/pino-stackdriver/compare/v1.0.0...v1.0.3) - 2018-11-27

### Added

- Screenshot to the docs by [@ovhemert](https://github.com/ovhemert)

### Security

- Fixed "event-stream" vulnerability by pinning exact version of dependency by [@ovhemert](https://github.com/ovhemert)

## [1.0.0](https://github.com/ovhemert/pino-stackdriver/releases/tag/v1.0.0) - 2018-10-19

- Initial version by [@ovhemert](https://github.com/ovhemert)
