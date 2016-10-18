define('@weex-component/repeat-root', function (require, exports, module) {

;module.exports = {
  data: function () {return {
    containers: [
      {name: 'a'},
      {name: 'b'}
    ]
  }}
}

;module.exports.template = {
  "type": "container",
  "repeat": function () {return this.containers},
  "children": [
    {
      "type": "text",
      "attr": {
        "value": "container"
      }
    }
  ]
}

;})

// require module

bootstrap('@weex-component/repeat-root')
