'use strict'

var valueFilter = {

  filterStyles: function (styles, config) {
    for (var key in styles) {
      var value = styles[key]
      var parser = this.getFilters(key, config)[typeof value]
      if (typeof parser === 'function') {
        styles[key] = parser(value)
      }
    }
  },

  getFilters: function (key, config) {
    if (key === 'flex' || key === 'opacity' || key === 'zIndex') {
      return {}
    }
    return {
      number: function (val) {
        return val * config.scale + 'px'
      },
      string: function (val) {
        if (val.match(/^[\d]+px$/)) {
          return parseFloat(val) * config.scale + 'px'
        }
        if (key.match(/transform/) && val.match(/translate/)) {
          return val.replace(/[\d]+px/g, function (match) {
            return parseInt(parseFloat(match) * config.scale) + 'px'
          })
        }
        return val
      }
    }
  }
}

module.exports = valueFilter
