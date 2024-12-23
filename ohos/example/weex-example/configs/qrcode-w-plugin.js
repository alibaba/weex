const qrcode = require('qrcode-terminal');
const SIZE_LARGE = 'large';
const SIZE_SMALL = 'small';
const defaultOptions = {
  size: SIZE_LARGE
};
const fs = require('fs')
const path = require('path')
class DevserverQRcodeWebpackPlugin {
  constructor(options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
      options = defaultOptions;
      console.warn('devserver-qrcode-webpack-plugin: the type of options should be Object');
    }
    const {
      size
    } = options;
    this.size = size == SIZE_LARGE ? SIZE_LARGE : SIZE_SMALL;
  }
  printQRcode(url) {
    qrcode.generate(url, {
      small: this.size === SIZE_SMALL
    });
  }
  apply(compiler) {
    const devServer = compiler.options.devServer;
    if (!devServer) {
      console.warn('devserver-qrcode-webpack-plugin: needs to start webpack-dev-server');
      return;
    }
    fs.readFile(path.resolve(__dirname, '../entry.json'), 'utf8', (err, data) => {
      const json = JSON.parse(data)
      json.parameter.weexParams.jsBundleEntry = `http://${devServer.host}:${devServer.port}/${json.parameter.weexParams.jsBundleEntry}`
      json.parameter.weexParams.serviceName = this.toUtf8(json.parameter.weexParams.serviceName)
      this.printQRcode(JSON.stringify(json));
    })
  }
  toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  }
}

module.exports = DevserverQRcodeWebpackPlugin;
