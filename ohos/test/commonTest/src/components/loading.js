import Loading from './loading.vue';
import { isWeex } from '../utils/index';
import Vue from 'vue';

Loading.newInstance = (properties) => {
  const _props = properties || {};
  const instance = new Vue({
    data: _props,
    render(h) {
      const vnode = h(Loading, {
        props: {
          fix: true,
        },
      });
      return h(
        'div',
        {
          class: 'ume-loading-fullscreen',
          style: {
            'z-index': 2011,
            position: 'fixed',
          },
        },
        [vnode],
      );
    },
  });
  const component = instance.$mount();
  const loading = instance.$children[0];
  if (isWeex) {
    weex.document.appendChild(component.$el);
  } else {
    document.body.appendChild(component.$el);
  }
  return {
    show() {
      loading.visible = true;
    },
    remove() {
      loading.visible = false;
    },
    component,
  };
};

let loadingInstance;
function getLoadingInstance(render = undefined) {
  loadingInstance =
    loadingInstance ||
    Loading.newInstance({
      render,
    });
  return loadingInstance;
}
function loadingFn(options) {
  const render = 'render' in options ? options.render : undefined;
  const instance = getLoadingInstance(render);
  instance.show(options);
}
Loading.show = function (props = {}) {
  return loadingFn(props);
};
Loading.hide = function () {
  if (!loadingInstance) return false;
  const instance = getLoadingInstance();
  instance.remove(() => {
    loadingInstance = null;
  });
};

export default Loading;
