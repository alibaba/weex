define('@weex-component/e9b6b411765a9cc9e9d1a0469ae0a84c', function(require, exports, module) {

    ;
    module.exports = {
        data: function() {
            return {
                firstName: 'Jack',
                lastName: 'Ma',
                peoples: [{
                    firstName: 'Evan',
                    lastName: 'You'
                }, {
                    firstName: 'Terry',
                    lastName: 'King'
                }]
            }
        },
        computed: {
            fullName: function() {
                return this.firstName + ' ' + this.lastName
            }
        }
    }


    ;
    module.exports.style = {}

    ;
    module.exports.template = {
        "type": "div",
        "classList": [
            "bg"
        ],
        "children": [{
            "type": "text",
            "repeat": function() {
                return this.peoples
            },
            "classList": [
                "text"
            ],
            "attr": {
                "value": function() {
                    return 'Hello ' + (this.fullName)
                }
            }
        }, {
            "type": "text",
            "attr": {
                "value": function() {
                    return this.fullName
                }
            }
        }]
    }

    ;
})

// require module
bootstrap('@weex-component/e9b6b411765a9cc9e9d1a0469ae0a84c', {
    "transformerVersion": "0.3.1"
})