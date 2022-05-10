import Vue from 'vue';
import App from './App.vue';
import hui from 'h_ui/dist/h_ui.min.js';
import 'h_ui/dist/theme/hui-theme-classic-blue.css';
import 'h_ui/dist/theme/hui-theme-night-black.css';
import 'h_ui/dist/h_ui.min.css';
import router from './router';
import EC from './components/EchartsComponent/register';
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/fold/foldgutter.css'
import './assets/github-markdown.css'

window.LOCAL_CONFIG = {
  isUcf: false
}

Vue.prototype.$store = {
  state: {
    root: {
      skeleton: {
        skin: 'blue'
      }
    }
  }
}
Vue.use(hui, {});
Vue.use(EC);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
