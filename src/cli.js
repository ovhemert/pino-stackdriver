#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')
const stackdriver = require('././index')

// main cli logic
function main () {
  program
    .version(pkg.version)
    .option('-c, --credentials <credentials>', 'The file path of the JSON file that contains your service account key')
    .option('-p, --project <project>', 'Your Google Cloud Platform project ID')
    .action(({ credentials, project }) => {
      try {
        const _credentials = credentials || process.env.GOOGLE_APPLICATION_CREDENTIALS
        if (!process.env.PROJECT_ID && !project) { throw Error('Project is missing.') }
        const _project = project || process.env.PROJECT_ID
        const writeStream = stackdriver.createWriteStream({ credentials: _credentials, projectId: _project })
        process.stdin.pipe(writeStream)
        console.info('logging')
      } catch (error) {
        console.log(error.message)
      }
    })

  program.parse(process.argv)
}

main()
