const path = require('path')
const { spawn } = require('child_process')

const generatePath = path.join(path.resolve(__dirname, 'debug-generate.js'))
const pinoGenerate = spawn('node', [generatePath])

const cliPath = path.join(path.resolve(__dirname, '..', 'src', 'cli.js'))
const cli = spawn('node', [cliPath])

pinoGenerate.stdout.pipe(cli.stdin)
