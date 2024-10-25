import Vue from 'vue';

import weex from 'weex-vue-render';

const VConsole = require('vconsole');

if (!window.location.href.includes('static')) {
    // eslint-disable-next-line no-new
    new VConsole({ theme: 'dark' });
}

weex.init(Vue);