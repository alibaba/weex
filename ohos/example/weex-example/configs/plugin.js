const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('./config');
const helper = require('./helper');
const pluginConfigPath = helper.rootNode(config.pluginConfigPath);
const outputPath = helper.rootNode(config.pluginFilePath);

const toLowerCamelCase = key => {
  return key.replace(/\b\-\w+\b/g, function(word){
    return word.substring(1,2).toUpperCase()+word.substring(2);
  });
}

const buildPlugins = () => {
  let content = '';
  let keys = [];
  const plugins =require(pluginConfigPath).web;
  if (plugins && plugins.length > 0) {
    for(let plugin of plugins){
      let camelCaseKey = toLowerCamelCase(plugin.name);
      content += `import ${camelCaseKey} from '${plugin.name}';\n`
      keys.push(camelCaseKey)
    }
    content += `export default [${keys.join(',')}];`
    fs.outputFileSync(outputPath, content);
    return true;
  }
  else {
    if (fs.existsSync(outputPath)) {
      fs.unlink(outputPath)
    }
    return false;
  }
}

module.exports = buildPlugins;
