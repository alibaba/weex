// read all files framework-*.js
// filter by args
// generate frameworks.js

var select
if (process.argv[2]) {
  select = process.argv[2].toLowerCase().split(',')
}

var path = require('path')
var fs = require('fs')

var dirPath = path.resolve(__dirname, '..', 'html5', 'runtime')

function getAllFrameworkNames () {
  var files = fs.readdirSync(dirPath)
  return files.filter(function (name) {
    return name.match(/^framework-/)
  }).map(function (filename) {
    return filename.replace(/^framework-(.+)\.js$/, '$1')
  }).filter(function (name) {
    return !select || select.indexOf(name) >= 0
  }).map(function (name) {
    var filePath = path.join(dirPath, 'framework-' + name + '.js')
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      content: fs.readFileSync(filePath, { encoding: 'utf8' })
    }
  })
}

function generateContent () {
  var frameworks = getAllFrameworkNames()
  var content = []
  var names = []
  frameworks.forEach(function (framework) {
    content.push(framework.content.trim())
    names.push('  ' + framework.name)
  })
  return '// built by npm run build:config\n\n' +
    content.join('\n') + '\n\n' +
    'export default {\n' + names.join(',\n') + '\n}\n'
}

function writeContent() {
  var content = generateContent()
  var filePath = path.join(dirPath, 'config.js')
  fs.writeFileSync(filePath, content)
}

writeContent()
