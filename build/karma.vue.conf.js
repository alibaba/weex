var webpackConfig = require('./webpack.vue.config')

delete webpackConfig.entry
delete webpackConfig.output

webpackConfig.babel = {
  plugins: [
    ['coverage', { ignore: ['test/'] }]
  ]
}

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    files: [
      '../html5/test/render/index.js'
    ],

    singleRun: true,

    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'html', dir: '../coverage', subdir: 'vue-renderer' },
        { type: 'text-summary', dir: '../coverage', subdir: 'vue-renderer' }
      ]
    },

    preprocessors: {
      '../html5/test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,

    plugins: [
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-webpack'
    ]
  })
}
