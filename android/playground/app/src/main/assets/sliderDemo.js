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
  "type": "div",
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

// module

define('@weex-component/ui-panel', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      type: 'default',
      title: '',
      dataClass: '', // FIXME transfer class
      border: 0
    }},
    ready: function() {
      console.log(this.data);
    }
  }


;module.exports.style = {
  "panel": {
    "marginBottom": 20,
    "backgroundColor": "#ffffff",
    "borderColor": "#dddddd",
    "borderWidth": 1
  },
  "panel-primary": {
    "borderColor": "rgb(40,96,144)"
  },
  "panel-success": {
    "borderColor": "rgb(76,174,76)"
  },
  "panel-info": {
    "borderColor": "rgb(70,184,218)"
  },
  "panel-warning": {
    "borderColor": "rgb(238,162,54)"
  },
  "panel-danger": {
    "borderColor": "rgb(212,63,58)"
  },
  "panel-header": {
    "backgroundColor": "#f5f5f5",
    "fontSize": 40,
    "paddingLeft": 12,
    "paddingRight": 12,
    "paddingTop": 20,
    "paddingBottom": 20,
    "color": "#333333"
  },
  "panel-header-primary": {
    "backgroundColor": "rgb(40,96,144)",
    "color": "#ffffff"
  },
  "panel-header-success": {
    "backgroundColor": "rgb(92,184,92)",
    "color": "#ffffff"
  },
  "panel-header-info": {
    "backgroundColor": "rgb(91,192,222)",
    "color": "#ffffff"
  },
  "panel-header-warning": {
    "backgroundColor": "rgb(240,173,78)",
    "color": "#ffffff"
  },
  "panel-header-danger": {
    "backgroundColor": "rgb(217,83,79)",
    "color": "#ffffff"
  },
  "panel-body": {
    "paddingLeft": 12,
    "paddingRight": 12,
    "paddingTop": 20,
    "paddingBottom": 20
  }
}

;module.exports.template = {
  "type": "div",
  "classList": function () {return ['panel', 'panel-' + (this.type)]},
  "style": {
    "borderWidth": function () {return this.border}
  },
  "children": [
    {
      "type": "text",
      "classList": function () {return ['panel-header', 'panel-header-' + (this.type)]},
      "attr": {
        "value": function () {return this.title}
      }
    },
    {
      "type": "div",
      "classList": function () {return ['panel-body', 'panel-body-' + (this.type)]},
      "children": [
        {
          "type": "content"
        }
      ]
    }
  ]
}

;})

// module

define('@weex-component/sliderDemo', function (require, exports, module) {

;
  var img0 = '//gw.alicdn.com/tps/i2/TB1DpsmMpXXXXabaXXX20ySQVXX-512-512.png_400x400.jpg';
  var img1 = '//gw.alicdn.com/tps/i1/TB1M3sQMpXXXXakXXXXApNeJVXX-360-360.png';
  module.exports = {
    data: {
      eventCnt: 0,
      togglePlayMsg: 'pause',
      sliders: [
        {
          interval: 1000,
          autoPlay: true,
          sliderPages: [
            {
              items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            },
            {
              items: [
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            },
            {
              items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            }
          ]
        },
        {
          interval: 3000,
          autoPlay: true,
          sliderPages: [
            {
              items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            },
            {
              items: [
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            },
            {
              items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            }
          ]
        },
        {
          interval: 5000,
          autoPlay: true,
          sliderPages: [
            {
              items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            },
            {
              items: [
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            },
            {
              items: [
                {
                  image: img0,
                  link: '//h5.m.taobao.com/1'
                },
                {
                  image: img1,
                  link: '//h5.m.taobao.com/1'
                }
              ]
            }
          ]
        }
      ]
    },
    methods: {
      ready: function() {
      },
      togglePlay: function() {
        var autoPlay = this.sliders[0].autoPlay
        autoPlay = !autoPlay
        this.sliders[0].autoPlay = autoPlay
        this.togglePlayMsg = autoPlay ? 'pause' : 'play'
      },
      handleSliderChange: function() {
        var nowCnt = this.eventCnt + 1
        this.eventCnt = nowCnt
      },
      setInterval1: function() {
        this.sliders[0].interval = 1000;
      },
      setInterval3: function() {
        this.sliders[0].interval = 3000;
      },
      setInterval5: function() {
        this.sliders[0].interval = 5000;
      }
    }
  };


;module.exports.style = {
  "body": {
    "backgroundColor": "#ffffff"
  },
  "slider": {
    "flexDirection": "row",
    "width": 714,
    "height": 400
  },
  "indicator": {
    "position": "absolute",
    "width": 714,
    "height": 460,
    "top": 140,
    "left": 240,
    "itemColor": "#dddddd",
    "itemSelectedColor": "rgb(40, 96, 144)"
  }
}

;module.exports.template = {
  "type": "scroller",
  "classList": [
    "body"
  ],
  "children": [
    {
      "type": "ui-panel",
      "attr": {
        "title": "auto-play",
        "type": "primary"
      },
      "children": [
        {
          "type": "ui-panel",
          "attr": {
            "title": "auto-play = false"
          },
          "children": [
            {
              "type": "slider",
              "classList": [
                "slider"
              ],
              "append": "tree",
              "attr": {
                "interval": function () {return this.sliders[1].interval},
                "autoPlay": "false"
              },
              "children": [
                {
                  "type": "indicator",
                  "classList": [
                    "indicator"
                  ]
                },
                {
                  "type": "sliderpage",
                  "repeat": function () {return this.sliders[1].sliderPages}
                }
              ]
            }
          ]
        },
        {
          "type": "ui-panel",
          "attr": {
            "title": "auto-play = true"
          },
          "children": [
            {
              "type": "slider",
              "classList": [
                "slider"
              ],
              "append": "tree",
              "attr": {
                "interval": function () {return this.sliders[0].interval},
                "autoPlay": function () {return this.sliders[0].autoPlay}
              },
              "children": [
                {
                  "type": "indicator",
                  "classList": [
                    "indicator"
                  ]
                },
                {
                  "type": "sliderpage",
                  "repeat": function () {return this.sliders[0].sliderPages}
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": function () {return 'Event, ' + (this.eventCnt) + ' change'},
        "type": "primary"
      },
      "children": [
        {
          "type": "slider",
          "classList": [
            "slider"
          ],
          "append": "tree",
          "attr": {
            "interval": function () {return this.sliders[0].interval},
            "autoPlay": function () {return this.sliders[0].autoPlay}
          },
          "events": {
            "change": "handleSliderChange"
          },
          "children": [
            {
              "type": "indicator",
              "classList": [
                "indicator"
              ]
            },
            {
              "type": "sliderpage",
              "repeat": function () {return this.sliders[0].sliderPages}
            }
          ]
        }
      ]
    },
    {
      "type": "ui-panel",
      "attr": {
        "title": "Indicator",
        "type": "primary"
      },
      "children": [
        {
          "type": "ui-panel",
          "attr": {
            "title": "default style"
          },
          "children": [
            {
              "type": "slider",
              "classList": [
                "slider"
              ],
              "append": "tree",
              "attr": {
                "interval": function () {return this.sliders[0].interval},
                "autoPlay": function () {return this.sliders[0].autoPlay}
              },
              "events": {
                "change": "handleSliderChange"
              },
              "children": [
                {
                  "type": "indicator",
                  "classList": [
                    "indicator"
                  ]
                },
                {
                  "type": "sliderpage",
                  "repeat": function () {return this.sliders[0].sliderPages}
                }
              ]
            }
          ]
        },
        {
          "type": "ui-panel",
          "attr": {
            "title": "width & height"
          },
          "children": [
            {
              "type": "slider",
              "classList": [
                "slider"
              ],
              "append": "tree",
              "attr": {
                "interval": function () {return this.sliders[0].interval},
                "autoPlay": function () {return this.sliders[0].autoPlay}
              },
              "children": [
                {
                  "type": "indicator",
                  "style": {
                    "itemColor": "#dddddd",
                    "width": 714,
                    "height": 460
                  }
                },
                {
                  "type": "sliderpage",
                  "repeat": function () {return this.sliders[0].sliderPages}
                }
              ]
            }
          ]
        },
        {
          "type": "ui-panel",
          "attr": {
            "title": "left & top"
          },
          "children": [
            {
              "type": "slider",
              "classList": [
                "slider"
              ],
              "append": "tree",
              "attr": {
                "interval": function () {return this.sliders[1].interval},
                "autoPlay": function () {return this.sliders[1].autoPlay}
              },
              "children": [
                {
                  "type": "indicator",
                  "classList": [
                    "indicator"
                  ],
                  "style": {
                    "top": -140,
                    "left": -240
                  }
                },
                {
                  "type": "sliderpage",
                  "repeat": function () {return this.sliders[1].sliderPages}
                }
              ]
            }
          ]
        },
        {
          "type": "ui-panel",
          "attr": {
            "title": "itemColor & itemSelectedColor"
          },
          "children": [
            {
              "type": "slider",
              "classList": [
                "slider"
              ],
              "append": "tree",
              "attr": {
                "interval": function () {return this.sliders[2].interval},
                "autoPlay": function () {return this.sliders[2].autoPlay}
              },
              "children": [
                {
                  "type": "indicator",
                  "classList": [
                    "indicator"
                  ],
                  "style": {
                    "itemSelectedColor": "rgb(217, 83, 79)"
                  }
                },
                {
                  "type": "sliderpage",
                  "repeat": function () {return this.sliders[2].sliderPages}
                }
              ]
            }
          ]
        },
        {
          "type": "ui-panel",
          "attr": {
            "title": "itemSize"
          },
          "children": [
            {
              "type": "slider",
              "classList": [
                "slider"
              ],
              "append": "tree",
              "attr": {
                "interval": function () {return this.sliders[1].interval},
                "autoPlay": function () {return this.sliders[1].autoPlay}
              },
              "children": [
                {
                  "type": "indicator",
                  "style": {
                    "itemColor": "#dddddd",
                    "itemSize": 40,
                    "top": 140,
                    "left": 180,
                    "width": 714,
                    "height": 460
                  }
                },
                {
                  "type": "sliderpage",
                  "repeat": function () {return this.sliders[1].sliderPages}
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/sliderDemo', {"transformerVersion":"0.1.8"})
