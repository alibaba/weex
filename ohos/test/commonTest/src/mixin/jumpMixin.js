import { jumpParams as jp } from '../utils/constants';
// import { , xlog } from '../utils/jsapi';
import { jumpNative, xlog } from '@/utils/jsapi.js';

export default {
  methods: {
    /**
     *
     * @param {*} extraParam { minVersion: '1.1.8', nostrict: 1 }
     */
    toWeexTest2(extraParam, sessionParams = '') {
      const p = jp.weexTest2_gray.weexParams;
      const jumpParams = {
        pageId: 200201,
        params: {
          sessionParams,
          weexParams: {
            weexId: p.weexId,
            jsBundleEntry: p.jsBundleEntry,
            commonJsEntry: p.commonJsEntry,
            serviceName: p.serviceName,
            weexName: p.weexName,
            weexUrl: p.weexUrl,
            webUrl: p.webUrl,
            ...extraParam,
          },
        },
      };
      jumpNative(jumpParams).then((data) => {
        // this.callback(data);
        xlog.info(data);
      });
    },
  },
};
