/* eslint-disable react/react-in-jsx-scope */
/* global __weex_data__, print, createElement */

try{
    console.log("abc in try");
} catch(err) {
    console.log("err");
} finally{
    console.log("finally");
}

var a= /(a.)/g;
var b = a.exec('abc,aac, ssa2, dda');
console.log(b);

console.log('aabccbddBc'.match(/(bss.)/g));

console.log("ceil");
console.log(Math.ceil(0.95)," == 1");
console.log(Math.ceil(4)," == 4");
console.log(Math.ceil(7.004)," == 8");
console.log(Math.ceil(-0.95)," == -0");
console.log(Math.ceil(-4)," == -4");
console.log(Math.ceil(-7.004)," == -7");

console.log("floor");
console.log(Math.floor( 45.95)," ==  45");
console.log(Math.floor( 45.05)," ==  45");
console.log(Math.floor( 4 )," ==  4");
console.log(Math.floor(-45.05)," ==  -46");
console.log(Math.floor(-45.95)," ==  -46");

console.log("random");
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

console.log("max");
console.log(Math.max(1,2,3)," == 3");
console.log(Math.max(1,2.2, 4.2), "== 4.2");
console.log(Math.max(1,"a"),"== null");
console.log(Math.max(),"== INT_MIN");

console.log("min");
console.log(Math.min(1,2,3)," == 1");
console.log(Math.min(0.5,2.2, 4), "== 0.5");
console.log(Math.min(1,"a"),"== null");
console.log(Math.min(),"== INT_MAX");

var a = 3;

console.log('start');
switch(a){
    case 1:
        console.log('switch 1');
        break;
    case 2:
        console.log('switch 2');
        break;
    default:
        console.log('default branch');
}
console.log('end');
class Component {
    constructor(props) {
        this.props = props;
    }

    setState(newData) {
        this.state = { ...this.state,
            ...newData
        };
        var prev = this.vcompoent_ptr;
        var next = this.render();
        updateElement(prev, next);
        this.vcompoent_ptr = next;
    }
}
var nativeModules = {};

const registerModule = moduleName => {
    var sourceKeys = Object.keys(moduleName);
    var key;

    for (var i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        nativeModules[key] = moduleName[key];
    }
};

const require = name => {
    const requireModule = name => {
        var methods = nativeModules[name];
        var target = {};
        var loop = function (methodName) {
            target[methodName] = function () {
                var args = __arguments.length > 2 ? __arguments.slice(2) : [];
                __callNativeModule({
                                   module: name,
                                   method: __arguments[1],
                                   args: args
                                   });
            };
        };
        if (methods && Array.isArray(methods)) {
            for (var i = 0; i < methods.length; i++) {
                loop(methods[i]);
            }
        }
        console.log("register",methods);
        return target;
    };

    const MODULE_NAME_PREFIX = '@weex-module/';

    if (name.split(MODULE_NAME_PREFIX).length > 1) {
        const weexModuleName = name.split(MODULE_NAME_PREFIX)[1];
        return requireModule(weexModuleName);
    }
};

__registerModules(['searchEvent']);

const render = segment => <root>{segment}</root>;

const View = props => <div {...props} />;

const Touchable = props => {
    return <div {...props} onClick={props.onPress} />;
};

const Text = props => <text {...props} />;

const NXImage = props => <image {...props} />;

const NXLink = props => <a {...props} />;

const searchEvent = require('@weex-module/searchEvent');

const WFWIDTH = 342;
const waterfallStyles = {
titleText: {
maxWidth: 290,
minWidth: 30,
height: 30,
marginLeft: 28,
marginRight: 28,
fontSize: 26,
lineHeight: 30,
color: '#444444'
},
divideLine: {
width: 180,
height: 1.5,
backgroundColor: '#cdcdcd'
},
wfDivideLine: {
width: 90,
height: 1.5,
backgroundColor: '#cdcdcd'
},
wfWrapper: {
minHeight: 100,
width: WFWIDTH,
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center'
},
wfLineWrap: {
width: WFWIDTH,
height: 64,
marginBottom: 20,
paddingLeft: 9.5,
paddingRight: 9.5,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center'
},
wfTitle: {
width: WFWIDTH - 40,
marginTop: 24,
marginBottom: 16,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center'
}
};

const styles = {
tag: {
flex: 1,
backgroundColor: '#FFFFFF',
marginLeft: 9,
marginRight: 9,
paddingLeft: 16,
paddingRight: 16,
height: 64,
borderRadius: 32
},
tagText: {
flex: 1,
lineHeight: 64,
textAlign: 'center',
color: '#444444',
fontSize: 26
}
};

class TipTag extends Component {
    constructor(props) {
        super(props);
    }
    _onClick = e => {
        console.log("click go");
        let searchParams = {};
        if (this.props.data.q) {
            searchParams.q = this.props.data.q;
        }

        if (this.props.data.params && this.props.data.params.length > 0) {
            this.props.data.params.forEach(item => {
                                           if (item.key) {
                                           searchParams[item.key] = item.value;
                                           }
                                           });
        }
        if (this.props.tiptype && this.props.tiptype == 'voice_smarttips') {
            searchParams['voiceFrom'] = '1';
            console.log("se go");
            searchEvent.searchOption("searchOption", {
                                     params: searchParams
                                     });
        } else {
            console.log("se go2");
            searchEvent.search("search", {
                               params: searchParams
                               });
        }
    };

    render() {
        let data = this.props.data;
        let tagStyle = styles.tag;

        if (!this.props.isListMode) {
            tagStyle = { ...styles.tag,
            marginLeft: 5.5,
            marginRight: 5.5
            };
        } else {
            tagStyle = styles.tag;
        }
        return <View style={tagStyle} onClick={this._onClick}>
        <Text style={styles.tagText}>{data.show}</Text>
        </View>;
    }

}

const _tiptag_export = {
default: TipTag
};

const TipTag_import_default_from__WidgetInWFStyle__tiptag = _tiptag_export.default;

const WidgetInWFStyle = props => {
    let tips = props.tips,
    tiptype = props.tiptype;

    if (!tips || tips.length === 0) {
        return null;
    }

    if (tips.length > 8) {
        tips = tips.slice(0, 8);
    }

    let wfTitle = <View style={waterfallStyles.wfTitle}>
    <View style={waterfallStyles.wfDivideLine} />
    <Text style={waterfallStyles.titleText}>{props.topic || '相关搜索'}</Text>
    <View style={waterfallStyles.wfDivideLine} />
    </View>;
    let wfLines = [];
    let tipLength = tips.length;

    function createWfLine(leftTip, rightTip) {
        let tag1 = <TipTag_import_default_from__WidgetInWFStyle__tiptag data={leftTip} isListMode={false} tiptype={tiptype} />;
        let tag2 = rightTip ? <TipTag_import_default_from__WidgetInWFStyle__tiptag data={rightTip} isListMode={false} tiptype={tiptype} /> : null;
        return <View style={waterfallStyles.wfLineWrap}>
        {tag1}
        {tag2}
        </View>;
    }
    for (var i = 0; i < tipLength; i += 2) {
        let wfLine = null;
        if (tipLength === 2) {
            wfLine = createWfLine(tips[i]);
            wfLines.push(wfLine);
            wfLine = createWfLine(tips[i + 1]);
        }
        else {
            if (i + 1 === tipLength) {
                wfLine = createWfLine(tips[i], null);
            }
            else {
                wfLine = createWfLine(tips[i], tips[i + 1]);
            }
        }
        wfLines.push(wfLine);
    }
    return <View style={waterfallStyles.wfWrapper}>
    {wfTitle}
    {wfLines}
    </View>;
};

const _WidgetInWFStyle_export = {
default: WidgetInWFStyle
};


const TipTag_import_default_from__WidgetInListStyle__tiptag = _tiptag_export.default;
const listStyles = {
listWrapper: {
width: 750,
minHeight: 162,
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
paddingBottom: 16
},
listLineWrap: {
width: 750,
height: 64,
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
marginBottom: 20,
paddingLeft: 11,
paddingRight: 11
},
listTitle: {
width: 750,
marginTop: 28,
marginBottom: 20,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center'
},
titleText: {
maxWidth: 290,
minWidth: 30,
height: 30,
marginLeft: 28,
marginRight: 28,
fontSize: 26,
lineHeight: 30,
color: '#444444'
},
divideLine: {
width: 180,
height: 1.5,
backgroundColor: '#cdcdcd'
}
};

const WidgetInListStyle = props => {
    let tips = props.tips,
    tiptype = props.tiptype;
    if (!tips || tips.length === 0) {
        return null;
    }

    if (tips.length > 8) {
        tips = tips.slice(0, 8);
    }

    const listTitle = <View style={listStyles.listTitle}>
    <View style={listStyles.divideLine} />
    <Text style={listStyles.titleText}>{props.topic || '相关搜索'}</Text>
    <View style={listStyles.divideLine} />
    </View>;
    let firstLineTips = [];
    let secondLineTips = [];
    tips.forEach((tip, index) => {
                 const tipTag = <TipTag_import_default_from__WidgetInListStyle__tiptag data={tip} isListMode={true} tiptype={tiptype} />;
                 if (tips.length / 2 < 2) {
                 firstLineTips.push(tipTag);
                 } else {
                 const firstLineCount = parseInt(tips.length / 2, 10) + tips.length % 2;

                 if (index < firstLineCount) {
                 firstLineTips.push(tipTag);
                 } else if (index < 8) {
                 secondLineTips.push(tipTag);
                 } else {}
                 }
                 });
    const firstLine = <View style={listStyles.listLineWrap}>{firstLineTips}</View>;
    const secondLine = secondLineTips.length > 0 ? <View style={listStyles.listLineWrap}>{secondLineTips}</View> : null;
    const listContent = [firstLine, secondLine];
    return <View style={listStyles.listWrapper}>
    {listTitle}
    {listContent}
    </View>;
};

const _WidgetInListStyle_export = {
default: WidgetInListStyle
};
const WidgetInListStyle_import_default_from__lib__WidgetInListStyle = _WidgetInListStyle_export.default;
const WidgetInWFStyle_import_default_from__lib__WidgetInWFStyle = _WidgetInWFStyle_export.default;
const defaultStyle__lib = {
container: {
backgroundColor: '#f2f2f2'
}
};

class Widget extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const _this$props = this.props,
        _this$props$model = _this$props.model,
        model = _this$props$model === "undefined" ? {} : _this$props$model,
        _this$props$status = _this$props.status,
        status = _this$props$status === "undefined" ? {} : _this$props$status;
        const _status$layoutStyle = status.layoutStyle,
        layoutStyle = _status$layoutStyle === "undefined" ? 0 : _status$layoutStyle;
        const content = parseInt(layoutStyle, 10) === 1 ? <WidgetInWFStyle_import_default_from__lib__WidgetInWFStyle {...model} /> : <WidgetInListStyle_import_default_from__lib__WidgetInListStyle {...model} />;
        return <View style={{ ...defaultStyle__lib.container
        }}>{content}</View>;
    }

}

const _lib_export = {
default: Widget
};
const Widget_import_default_from___lib = _lib_export.default;
const _data = __weex_data__;
const defaultStyle = {
container: {
backgroundColor: '#ffffff'
}
};

class Segment extends Component {
    constructor(props) {
        super(props);
        this.state = {
        data: _data
        };
    }
    render() {
        const _this$state$data = this.state.data,
        data = _this$state$data === "undefined" ? {} : _this$state$data;
        return <View style={{ ...defaultStyle.container
        }}>
        <Widget_import_default_from___lib {...data} />
        </View>;
    }

}

render(<Segment />);

