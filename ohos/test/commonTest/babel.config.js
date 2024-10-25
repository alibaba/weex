console.log('building babel.config.js process.env.NODE_ENV:' + process.env.NODE_ENV + ' process.env.ISHARMONY:' + process.env.ISHARMONY)
module.exports = {
  plugins: ['./configs/weexTransform.js']  
}
