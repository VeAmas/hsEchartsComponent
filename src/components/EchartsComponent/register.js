import * as EC from './index.js';

export default {
  install(/** @type {import('vue').VueConstructor<Vue>} */ Vue) {
    for (const key in EC) {
      Vue.component(key, EC[key]);
    }
  }
};
