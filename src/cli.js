#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')
const stackdriver = require('././index')

function collect (value, previous) {
  return previous.concat([value])
}

// main cli logic
function main () {
  program
    .version(pkg.version)
    .option('-c, --credentials <credentials>', 'The file path of the JSON file that contains your service account key')
    .option('-p, --project <project>', 'Your Google Cloud Platform project ID')
    .option('-k, --key <key:customKey>', 'Customize additional data to include in log metadata', collect, [])
    .option('-n, --logName <name>', 'The name of the log. Defaults to "pino_log".')
    .option('-r, --resource <resource>', 'The resource to send logs to. Defaults to { "type": "global" }', JSON.parse, { type: 'global' })
    .action(({ credentials, project, key, logName, resource }) => {
      try {
        const _credentials = credentials || process.env.GOOGLE_APPLICATION_CREDENTIALS
        if (!process.env.PROJECT_ID && !project) { throw Error('Project is missing.') }
        const _project = project || process.env.PROJECT_ID

        const customKeys = {}
        key.forEach(k => {
          const pair = k.split(':')
          if (pair.length !== 2) { throw Error(`Invalid key:customKey pair ${k}`) }
          customKeys[pair[0]] = pair[1]
        })

        const writeStream = stackdriver.createWriteStream({ credentials: _credentials, projectId: _project, keys: customKeys, logName, resource })
        process.stdin.pipe(writeStream)
        console.info('logging')
      } catch (error) {
        console.log(error.message)
      }
    })

  program.parse(process.argv)
}

main()
