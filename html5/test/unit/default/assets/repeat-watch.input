define('@weex-component/04f1048c50eca3454bc70de93d3213d4', function(require, exports, module) {

    ;
    module.exports = {
        data: function() {
            return {
                list: [{
                    text: 1
                }, {
                    text: 2
                }],
                more: [{
                    text: 3
                }]
            }
        },
        ready: function() {
            for (var i = 0; i < this.more.length; i++) {
                this.list.push(this.more[i]);
            }
        }
    }


    ;
    module.exports.style = {}

    ;
    module.exports.template = {
        "type": "list",
        "children": [{
            "type": "cell",
            "append": "tree",
            "repeat": function() {
                return this.list
            },
            "children": [{
                "type": "text",
                "style": {
                    "height": 600
                },
                "attr": {
                    "value": function() {
                        return this.text
                    }
                }
            }]
        }]
    }

    ;
})

// require module
bootstrap('@weex-component/04f1048c50eca3454bc70de93d3213d4', {
    "transformerVersion": "0.3.1"
})