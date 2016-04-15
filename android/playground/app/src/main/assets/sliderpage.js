define('@weex-component/slideritem', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      image: '',
      link: '',
      href: ''
    }},
    methods: {
      ready: function() {
        this.href = this.link;
      }
    }
  };


;module.exports.style = {
  "slideritem": {
    "width": 348,
    "height": 400
  }
}

;module.exports.template = {
  "type": "image",
  "classList": [
    "slideritem"
  ],
  "attr": {
    "src": function () {return this.image}
  }
}

;})

// module

define('@weex-component/sliderpage', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      items: [],
      sliderItems: []
    }},
    methods: {
      ready: function() {
        this.sliderItems = this.getSliderItems()
      },
      getSliderItems: function() {
        return this.items.map(function(item, index) {
          return item;
        }.bind(this));
      }
    }
  };


;module.exports.style = {
  "sliderpage": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "width": 714,
    "height": 420
  }
}

;module.exports.template = {
  "type": "container",
  "classList": [
    "sliderpage"
  ],
  "children": [
    {
      "type": "slideritem",
      "repeat": function () {return this.sliderItems}
    }
  ]
}

;})

// require module
bootstrap('@weex-component/sliderpage', {"transformerVersion":"0.1.8"})