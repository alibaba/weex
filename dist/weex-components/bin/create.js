#!/usr/bin/env node
'use strict';

let path = require('path');
let fs = require('fs');
let npmlog = require('npmlog');

let argv = require('yargs')
  .usage('wxc [name] [--command]')
  .example('# create one ".we" file\nwxc homepage -o ./example')
  .example('# force to create parted files\nwxc header -p -f -o ./components')
  .boolean('p')
  .alias('p', 'parted')
  .describe('p', 'create parted files "js/css/html"')
  .demand('o')
  .alias('o', 'out')
  .describe('o', 'the folder that write the file(s)')
  .boolean('f')
  .alias('f', 'force')
  .describe('f', 'force to replace exsisting file(s)')
  .argv;

function getWeContent(name) {
  return `<template>
  <div class="wxc-${name}"></div>
</template>

<style>
.wxc-${name} {}
</style>

<script>
module.exports = {
  data: {

  },
  methods: {

  }
};
</script>
`;
}

function getPartedContent(name) {
  const JS = `var template = require('./${name}.html');
var style = require('./${name}.css');

module.exports = {
  template: template,
  style: style,
  data: {

  },
  methods: {

  }
};
`;

  const CSS = `.wxc-${name} {}`;
  const HTML = `<div class="wxc-${name}"></div>`;

  return {
    JS,
    CSS,
    HTML
  }
}

function write(name, type, content) {
  let filepath = path.join(output, `${name}.${type}`);
  if (fs.existsSync(filepath) && !argv.force) {
    npmlog.error('exists: ', '%s', filepath);
    npmlog.info('use --force to continue');
    return false;
  }
  fs.writeFileSync(filepath, content, 'utf-8');
  npmlog.info('write: ', '%s', filepath)
  return true;
}

const CWD = process.cwd();
const output = path.join(CWD, argv.out);
argv._.forEach(function(name) {
  if (argv.parted) {
    let content = getPartedContent(name);
    return write(name, 'js', content.JS) &&
            write(name, 'css', content.CSS) &&
            write(name, 'html', content.HTML);
  } else {
    let content = getWeContent(name);
    return write(name, 'we', content);
  }
});