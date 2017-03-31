;(function () {
  var str = '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
              '<meta charset="utf-8">' +
              '<title>Weex Vue Demo</title>' +
              '<meta name="viewport" content="width=750, user-scalable=no">' +
              '<meta name="apple-mobile-web-app-capable" content="yes" />' +
              '<meta name="apple-mobile-web-app-status-bar-style" content="black" />' +
              '<meta name="apple-touch-fullscreen" content="yes" />' +
              '<meta name="format-detection" content="telephone=no, email=no" />' +
              '<style>' +
                'html, body {' +
                  'height: 100%;' +
                  'width: 100%;' +
                '}' +
              '</style>' +
              '<script src="https://unpkg.com/vue/dist/vue.runtime.js"></script>' +
              '<script src="https://unpkg.com/weex-vue-render/index.js"></script>' +
            '</head>' +
            '<body>' +
              '<div id="root"></div>' +
              '<script>' +
                  'var url = window.parent.WEB_BUNDLE_URL;' +
                  'var jsTag = document.createElement("script");' +
                  'jsTag.src = url;' +
                  'document.body.appendChild(jsTag);' +
              '</script>' +
            '</body>' +
            '</html>'


  var iframe = document.getElementById('iframe')
  var doc = iframe.contentDocument || iframe.contentWindow.document

  doc.write(str)
}());