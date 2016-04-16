define('@weex-component/ui-list-item', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      bgColor: '#ffffff',
      click: function() {
      }
    }},
    methods: {
      touchstart: function() {
        // TODO adaptive opposite bgColor
//        this.bgColor = '#e6e6e6';
      },
      touchend: function() {
//        this.bgColor = '#ffffff';
      }
    }
  }


;module.exports.style = {
  "item": {
    "paddingTop": 25,
    "paddingBottom": 25,
    "paddingLeft": 35,
    "paddingRight": 35,
    "height": 160,
    "justifyContent": "center",
    "borderBottomWidth": 1,
    "borderColor": "#dddddd"
  }
}

;module.exports.template = {
  "type": "div",
  "classList": [
    "item"
  ],
  "events": {
    "click": "click",
    "touchstart": "touchstart",
    "touchend": "touchend"
  },
  "style": {
    "backgroundColor": function () {return this.bgColor}
  },
  "children": [
    {
      "type": "content"
    }
  ]
}

;})

// module

define('@weex-component/indexitem', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      title: '',
      url: ''
    }},
    methods: {
      redirect: function() {
        this.$openURL(this.url);
      }
    }
  }


;module.exports.style = {
  "item-txt": {
    "fontSize": 48,
    "color": "#555555"
  }
}

;module.exports.template = {
  "type": "ui-list-item",
  "attr": {
    "click": function () {return this.redirect}
  },
  "children": [
    {
      "type": "text",
      "classList": [
        "item-txt"
      ],
      "attr": {
        "value": function () {return this.title}
      }
    }
  ]
}

;})

// module

define('@weex-component/index', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      cases: [
        {name: 'hello', title: 'Hello World'},
//        {name: 'textDemo', title: 'Text'},
        {name: 'imageDemo', title: 'Image'},
        {name: 'listBasic', title: 'List (Basic)'},
        {name: 'listDemo', title: 'List (Advanced)'},
        {name: 'sliderDemo', title: 'Slider'},
        {name: 'animation', title: 'Animation'},
        {name: 'modal', title: 'Modal'},
        {name: 'videoDemo', title: 'Video'},
        {name: 'ui', title: 'UI Gallery'},
        {name: 'template', title: 'Example Template'}
      ]
    }},
    created: function() {
      console.log('hit', this.$getConfig().bundleUrl);
      var host = '//localhost:12580';
      var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);
      if (matches && matches.length >= 2) {
        host = matches[1];
      }
      var nativeBase = 'file://assets/';
      var h5Base = './index.html?page=./examples/build/';
      // in Native
      var base = nativeBase;
      if (typeof window === 'object') {
        // in Browser or WebView
        base = h5Base;
      }

      for (var i in this.cases) {
        var ca = this.cases[i];
        ca.url = base + ca.name + '.js';
      }
      // see log in Android Logcat
      console.log('hit', this.cases[0].url);
    }
  }


;module.exports.style = {}

;module.exports.template = {
  "type": "list",
  "children": [
    {
      "type": "cell",
      "append": "tree",
      "repeat": function () {return this.cases},
      "children": [
        {
          "type": "indexitem",
          "attr": {
            "title": function () {return this.title},
            "url": function () {return this.url}
          }
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/index', {"transformerVersion":"0.1.8"})