// module
define('@weex-component/append-root-event', function(require, exports, module) {

    ;
    module.exports = {
        data: function() {
            return {
                x: 1
            }
        },
        methods: {
            update: function() {
                this.x = 2
            }
        }
    }


    ;
    module.exports.style = {}

    ;
    module.exports.template = {
        "type": "div",
        "append": "tree",
        "children": [{
            "type": "text",
            "events": {
                "click": "update"
            },
            "attr": {
                "value": function() {
                    return this.x
                }
            }
        }]
    }

    ;
})

// require module

bootstrap('@weex-component/append-root-event', {
    "transformerVersion": "0.3.1"
})
