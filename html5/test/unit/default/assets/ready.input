define('@weex-component/created', function(require, exports, module) {

    ;
    module.exports = {
        data: function() {
            return {
                text: '',
            }
        },
        ready: function() {
            this.text = '1'
        }
    }


    ;
    module.exports.style = {}

    ;
    module.exports.template = {
        "type": "container",
        "children": [{
            "type": "text",
            "attr": {
                "value": function() {
                    return this.text
                }
            }
        }]
    }

    ;
})

// require module
bootstrap('@weex-component/created', {
    "transformerVersion": "0.3.1"
})