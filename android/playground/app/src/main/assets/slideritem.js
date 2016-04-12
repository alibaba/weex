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

// require module
bootstrap('@weex-component/slideritem', {"transformerVersion":"0.1.8"})