// fix Promise Problem on JSContext of iOS7~8
// @see https://bugs.webkit.org/show_bug.cgi?id=135866
const { WXEnvironment } = global

/* istanbul ignore next */
if (WXEnvironment && WXEnvironment.platform === 'iOS') {
  global.Promise = undefined
}
