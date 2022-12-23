import Vue from 'vue';
import App from './App.vue';
import hui from 'h_ui/dist/h_ui.min.js';
import 'h_ui/dist/theme/hui-theme-classic-blue.css';
import 'h_ui/dist/theme/hui-theme-night-black.css';
import 'h_ui/dist/h_ui.min.css';

import '@fais/tzjc-comps/standardCss/index.less';
import './style/theme.scss'
import '@fais/tzjc-comps/standardCss/hui/cover/h-btn.less';
import '@fais/tzjc-comps/standardCss/hui/cover/h-page.less';
import '@fais/tzjc-comps/standardCss/hui/cover/h-table.less';
import '@fais/tzjc-comps/compsIcon/iconfont.css';
import '@fais/tzjc-comps/Css/compactWrapper.css';
import './style/iconfontFk50/iconfontFK50.css';

import router from './router';
import EC from './components/EchartsComponent/register';
import CheckBtn from '@fais/tzjc-comps/UiComps/FaisCheckBtn/CheckBtn.vue';
import CheckBtnGroup from '@fais/tzjc-comps/UiComps/FaisCheckBtn/CheckBtnGroup.vue';

import FaisTransferList from './components/FaisTransferList/index.js';

hui.Drawer.props.maskStyle.type = [String, Object];

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldgutter.css';
import './assets/github-markdown.css';

// Vue.config.silent = true;

Vue.prototype.$store = {
  state: {
    root: {
      skeleton: {
        skin: 'blue'
      }
    }
  }
};
Vue.use(hui);
Vue.use(EC);

Vue.component('FaisCheckBtn', CheckBtn);
Vue.component('FaisCheckBtnGroup', CheckBtnGroup);

Vue.component('FaisTransferListDrawer', FaisTransferList);
Vue.component('FaisTransferList', FaisTransferList.TransferList);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
