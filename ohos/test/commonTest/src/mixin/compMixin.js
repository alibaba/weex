import toast from '../components/toast.vue';
import oldToast from '../components/oldToast.vue';
import modal from '../components/modal.vue';
import umeLoading from '../components/loading.vue';
import navbar from '../components/navbar.vue';
// import { isWeex } from '../utils/index';
import { isWeex } from '@/utils/jsapi.js';

const globalEvent = weex.requireModule('globalEvent');

export default {
  components: {
    navbar,
    umeLoading,
    toast,
    modal,
    oldToast,
  },
  data() {
    return {
      isWeex,
      showModal: false,
      showLoading: false,
      showToast: false,
      content: '',
      // bottomHeight: 0,
    };
  },
  mounted() {
    this.updateBottomHeigt();
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    closeToast() {
      this.showToast = false;
    },
    updateBottomHeigt() {
      globalEvent.addEventListener('WXFreshLayoutHeight', (data) => {
        const { env } = weex.config;
        const scale = 750 / env.deviceWidth;
        this.bottomHeight = data.bottomHeight * scale;
      });
    },
  },
};
