// require all test files
const testsContext = require.context('./vue', true, /\.js$/)
testsContext.keys().forEach(testsContext)
