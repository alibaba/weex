'use strict';


module.exports = (process.env.platform === 'android') ? function (node) {
    //Android 
    switch (node) {
        case "text":
            return "android.view.View";
        case "input":
            return "android.widget.EditText"
        case "div":
        default:
            return "android.widget.FrameLayout";
    }
} : function (node) {
    //iOS
    switch (node) {
        case "input":
            return "XCUIElementTypeTextField";
        case "text":
            return "XCUIElementTypeStaticText";
        case "div":
        default:
            return "XCUIElementTypeOther"
    }
}