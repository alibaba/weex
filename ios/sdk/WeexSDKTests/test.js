
var data = [{
            "method": "createBody",
            "module": "dom",
            "arguments": ["div"]
            },
            {
            "method": "addElement",
            "module": "dom",
            "arguments": ["_root",{
                          "ref": "ref_e_000",
                          "type": "div",
                          "style": {
                          "flex-direction": "row",
                          "flex-wrap": "wrap",
                          "align-items": "center"
                          },
                          "attr": {
                          "value": "abc"
                          },
                          "event": ["click"]
                          }]
            }];
callNative("0", data, 1);