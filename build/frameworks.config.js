// generate frameworks/index.js

// npm run build:frameworks:config Weex,Rx,Vue
var select
if (process.argv[2]) {
  select = process.argv[2].split(',')
}

var path = require('path')
var fs = require('fs')
var inquirer = require('inquirer')
var packageJson = require('../package.json')

var frameworksPath = path.resolve(__dirname, '..', 'html5', 'frameworks')
var frameworksMetaData = {
  weex: {
    name: 'Weex',
    source: 'import * as Weex from \'./legacy/index\''
  },
  vanilla: {
    name:'Vanilla',
    source: 'import * as Vanilla from \'./vanilla/index\''
  }
}

function getAllFrameworkNames () {
  var dependencies = Object.keys(packageJson.dependencies)
  var choices = [
    {
      name: 'Weex',
      checked: true,
    },
    {
      name: 'Vanilla',
      checked: true,
    }
  ]

  dependencies.forEach(function (packageName) {
    var result = packageName.match(/weex-(.*)-framework/)
    if (result) {
      var name = result[1]
      var frameworkName = name.charAt(0).toUpperCase() + name.slice(1)
      var mataData = {
        name: frameworkName,
        source: 'import * as ' + frameworkName + ' from \'' + packageName + '\''
      }
      choices.push({
        name: frameworkName,
      })
      frameworksMetaData[frameworkName.toLowerCase()] = mataData
    }
  })


  if (select) {
    return new Promise(function (resolver){
      resolver({
        frameworks: select
      })
    })
  } else {
    return inquirer.prompt([
      {
        type: 'checkbox',
        message: 'Select frameworks:',
        name: 'frameworks',
        choices: choices
      }
    ])
  }
}

function generateContent () {
  var frameworks = getAllFrameworkNames()
  frameworks.then(function (answers) {
    var content = []
    var names = []
    answers.frameworks.forEach(function (framework) {
      var metaData = frameworksMetaData[framework.toLowerCase()];
      if (metaData) {
        content.push(metaData.source)
        names.push('  ' + metaData.name)
      } else {
        throw Error(framework, 'is not existed, confirm input correct framework name.')
      }
    })
    var content = '// built by npm run build:frameworks:config\n\n' +
      content.join('\n') + '\n\n' +
      'export default {\n' + names.join(',\n') + '\n}\n'

    writeContent(content)
  })
}

function writeContent(content) {
  var filePath = path.join(frameworksPath, 'index.js')
  fs.writeFileSync(filePath, content)
  console.log('Generate frameworks config to', filePath)
}

generateContent()
