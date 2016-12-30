# &lt;a&gt;
<span class="weex-version">0.5</span>

###Summary
&lt;a&gt; defines a hyperlink to a page in the web. Its purpose and syntax is very similar to [&lt;a&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) in HTML5.

### Child Components

This type of component supports all kinds of weex component as its child components except for its own kind.

### Attributes
##### href
href attributes defines the URL of the hyperlink.

### Styles
**common styles**: check out the [common styles](../references/common-attrs.md)

### Events
**common events**: check out the [common events](../references/common-event.md)  
tip: we can't guarantee the order of execution between onclick function and href

### Examples
    <a href="http://g.tbcdn.cn/ali-wireless-h5/res/0.0.16/hello.js">
       <text>Click me to see how 'A' element opens a new world.</text>
    </a>
