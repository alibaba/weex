// module
define('@weex-component/append', function(require, exports, module) {;
  module.exports = {
    data: function() {
      return {
        itemList: [{
          itemId: '520421163634',
          title: 'title1',
          pictureUrl: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'
        }, {
          itemId: '522076777462',
          title: 'title2',
          pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'
        }]
      }
    }
  }


  ;
  module.exports.style = {}

  ;
  module.exports.template = {
    "type": "container",
    "style": {
      "flexDirection": "column"
    },
    "append": "tree",
    "children": [{
      "type": "container",
      "children": [{
        "type": "image",
        "attr": {
          "src": function() {
            return this.pictureUrl
          }
        }
      }, {
        "type": "text",
        "attr": {
          "value": function() {
            return this.title
          }
        }
      }],
      "repeat": function() {
        return this.itemList
      }
    }]
  }

  ;
})

// require module

bootstrap('@weex-component/append')