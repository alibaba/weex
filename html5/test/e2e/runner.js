/* eslint-disable */

var path = require('path')
var spawn = require('cross-spawn')
var httpServer = require('http-server')
var server = httpServer.createServer({
  root: path.resolve(__dirname, '../../../')
})

server.listen(8088)

var args = process.argv.slice(2)
if (args.indexOf('--config') === -1) {
  args = args.concat(['--config', 'build/nightwatch.config.js'])
}
if (args.indexOf('--env') === -1) {
  args = args.concat(['--env', 'phantomjs'])
}
var i = args.indexOf('--test')
if (i > -1) {
  args[i + 1] = 'html5/test/e2e/specs/' + args[i + 1]
}

var runner = spawn('nightwatch', args, {
  stdio: 'inherit'
})

runner.on('exit', function (code) {
  server.close()
  process.exit(code)
})

runner.on('error', function (err) {
  server.close()
  throw err
})
