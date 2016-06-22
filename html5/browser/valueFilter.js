'use strict'

const NOT_PX_NUMBER_PROPERTIES = ['flex', 'opacity', 'zIndex', 'fontWeight']

const valueFilter = {

  filterStyles: function (styles, config) {
    for (const key in styles) {
      const value = styles[key]
      const parser = this.getFilters(key, config)[typeof value]
      if (typeof parser === 'function') {
        styles[key] = parser(value)
      }
    }
  },

  getFilters: function (key, config) {
    if (NOT_PX_NUMBER_PROPERTIES.indexOf(key) !== -1) {
      return {}
    }
    return {
      number: function (val) {
        return val * config.scale + 'px'
      },
      string: function (val) {
        // string of a pure number or a number suffixed with a 'px' unit
        if (val.match(/^\-?\d*\.?\d+(?:px)?$/)) {
          return parseFloat(val) * config.scale + 'px'
        }
        if (key.match(/transform/) && val.match(/translate/)) {
          return val.replace(/\d*\.?\d+px/g, function (match) {
            return parseInt(parseFloat(match) * config.scale) + 'px'
          })
        }
        return val
      }
    }
  }
}

module.exports = valueFilter
