// http://nightwatchjs.org/guide#settings-file
module.exports = {
  'src_folders': ['html5/test/e2e/specs'],
  'output_folder': 'html5/test/e2e/reports',

  'selenium': {
    'start_process': true,
    'server_path': 'node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.1.jar',
    'log_path': false,
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  'test_settings': {
    
    'default': {
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'launch_url': 'http://localhost',
      'silent': true,
      'screenshots': {
        'enabled': true,
        'on_failure': true,
        'on_error': false,
        'path': 'html5/test/e2e/screenshots'
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'firefox': {
      'desiredCapabilities': {
        'browserName': 'firefox',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    },

    'phantomjs': {
      'desiredCapabilities': {
        'browserName': 'phantomjs',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }
  }
}
