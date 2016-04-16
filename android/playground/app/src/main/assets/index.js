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
  "type": "container",
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
        {name: 'ui', title: 'UI Gallery', url: ''},
        {name: 'listDemo', title: 'List'},
        {name: 'listComposite', title: 'List with composition'},
        {name: 'sliderDemo', title: 'Slider'},
        {name: 'modal', title: 'Toast & Modal Dialogs'},
        {name: 'animation', title: 'Animation'},
        {name: 'gesture', title: 'Gesture'},
        {name: 'videoDemo', title: 'Video'},
//        {name: '../../test/build/index', title: 'Test'}
      ]
    }},
    created: function() {
      var useLocal = true; // false when releasing
      var localBase = 'file://assets/';
      var nativeBase = '';
      var h5Base = './index.html?page=./examples/build/';

      // in native
      var base = useLocal ? localBase : nativeBase;
      // in browser or WebView
      if (typeof window === 'object') {
        base = h5Base;
      }

      for (var i in this.cases) {
        var ca = this.cases[i];
        ca.url = base + ca.name + '.js';
      }
      //nativeLog('hit', this.cases[0].url);
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