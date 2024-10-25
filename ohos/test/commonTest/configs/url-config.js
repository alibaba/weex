var env = process.env.NODE_ENV || 'development';

var config = {
  'development': {
    urlBase: 'http://119.254.233.174/gateway/api/web/umebotweb/' // 灰度地址
    // urlBase: 'http://119.254.233.175/gateway/api/web/umebotweb/' // 测试地址
    // urlBase: 'https://cloud.umetrip.com/gateway/api/web/umebotweb/xhqa/' // 线上地址
  },

  'production': {
    // urlBase: 'http://119.254.233.175/gateway/api/web/umebotweb/' // 测试地址
    urlBase: 'http://119.254.233.174/gateway/api/web/umebotweb/' // 接口灰度地址
    // urlBase: 'https://cloud.umetrip.com/gateway/api/web/umebotweb/' // 线上地址
  }
};

module.exports = config[env];