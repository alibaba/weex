// You can see all the config in `./configs`.
console.log('1. building webpack.config.js');
const buildPlugins = require('./configs/plugin');
let webpackConfig;
module.exports = (env) => {
  console.log('building webpack.config.js env.NODE_ENV:' + env.NODE_ENV);
  switch (env.NODE_ENV) {
    case 'prod':
    case 'production':
      webpackConfig = require('./configs/webpack.prod.conf');
      break;
    case 'harmony':
      webpackConfig = require('./configs/webpack.harmony.conf');
      break;
    case 'test':
    case 'testing':
      webpackConfig = require('./configs/webpack.test.conf');
      break;
    case 'plugin':
      buildPlugins();
    case 'common':
      webpackConfig = require('./configs/webpack.common.conf');
      break;
    case 'release':
      webpackConfig = require('./configs/webpack.release.conf');
      break;
    case 'dev':
    case 'development':
    default:
      webpackConfig = require('./configs/webpack.dev.conf');
  }
  return webpackConfig;
};
