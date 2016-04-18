define('@weex-component/listBasic', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      items: [
        {id: 1, title: 'Title Start'},
        {id: 2, title: 'Title Title'},
        {id: 3, title: 'Title Title'},
        {id: 4, title: 'Title Title'},
        {id: 5, title: 'Title Title'},
        {id: 6, title: 'Title Title'},
        {id: 7, title: 'Title Title'},
        {id: 8, title: 'Title Title'},
        {id: 9, title: 'Title Title'},
        {id: 10, title: 'Title Title'},
        {id: 11, title: 'Title Title'},
        {id: 12, title: 'Title Title'},
        {id: 13, title: 'Title Title'},
        {id: 14, title: 'Title Title'},
        {id: 15, title: 'Title End'}
      ]
    }}
  }


;module.exports.style = {
  "item": {
    "fontSize": 48,
    "height": 100
  }
}

;module.exports.template = {
  "type": "div",
  "children": [
    {
      "type": "list",
      "children": [
        {
          "type": "cell",
          "append": "tree",
          "repeat": function () {return this.items},
          "children": [
            {
              "type": "text",
              "classList": [
                "item"
              ],
              "attr": {
                "value": function () {return (this.title) + ' ' + (this.id)}
              }
            }
          ]
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/listBasic', {"transformerVersion":"0.1.8"})