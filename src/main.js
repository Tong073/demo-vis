import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/css/swiper.css'

import * as echarts from 'echarts';
import 'echarts-gl';
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.prototype.$echarts = echarts
// Vue.prototype.$echartsGl = echartsGl;

Vue.config.productionTip = false

import VueAwesomeSwiper from "vue-awesome-swiper";


Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI);
Vue.use(VideoPlayer);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
