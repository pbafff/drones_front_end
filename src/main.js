import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire';
import router from '@/router';

Vue.config.productionTip = false;

const eventBus = new Vue();
export default eventBus;

Vue.use(VueFire);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
