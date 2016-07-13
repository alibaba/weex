module.exports = {
  'index page': function (browser) {
    browser.url('http://localhost:8088/index.html')
    browser.expect.element('#weex').to.be.present
    browser.end()
  }
}
