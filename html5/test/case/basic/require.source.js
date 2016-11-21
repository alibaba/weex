var browserifyRequire=function r(e,n,o){function t(u,i){if(!n[u]){if(!e[u]){var a="function"==typeof browserifyRequire&&browserifyRequire;if(!i&&a)return a(u,!0);if(f)return f(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[u]={exports:{}};e[u][0].call(l.exports,function(r){var n=e[u][1][r];return t(n?n:r)},l,l.exports,r,e,n,o)}return n[u].exports}for(var f="function"==typeof browserifyRequire&&browserifyRequire,u=0;u<o.length;u++)t(o[u]);return t}({"1ba80324acff072bbb2b768911a5e4f1":[function(r,e,n){e.exports="Hello World"},{}]},{},[]);


define('@weex-component/foo', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      text: ''
    }},
    created: function() {
      this.text = browserifyRequire("1ba80324acff072bbb2b768911a5e4f1")
    }
  }


;module.exports.style = {}

;module.exports.template = {
  "type": "container",
  "children": [
    {
      "type": "text",
      "attr": {
        "value": function () {return this.text}
      }
    }
  ]
}

;})

// require module
bootstrap('@weex-component/foo', {"transformerVersion":"0.3.0"})
