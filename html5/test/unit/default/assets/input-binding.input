define('@weex-component/d6b20355da35c77d07f0a11ec5256f42', function(require, exports, module) {

    ;
    module.exports = {
        data: function() {
            return {
                x: 'abcde',
                changes: []
            }
        },
        methods: {
            change: function(e) {
                var value = e.target.attr.value
                this.x = value
                this.changes.push(value)
            }
        }
    }


    ;
    module.exports.style = {}

    ;
    module.exports.template = {
        "type": "div",
        "children": [{
            "type": "input",
            "attr": {
                "value": function() {
                    return this.x
                }
            },
            "events": {
                "change": "change"
            }
        }, {
            "type": "text",
            "repeat": {
                "expression": function() {
                    return this.changes
                },
                "key": "k",
                "value": "v"
            },
            "attr": {
                "value": function() {
                    return (this.k + 1) + ' - ' + (this.v)
                }
            }
        }]
    }

    ;
})

// require module
bootstrap('@weex-component/d6b20355da35c77d07f0a11ec5256f42', {
    "transformerVersion": "0.3.1"
})
