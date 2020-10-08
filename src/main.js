import Vue from 'vue'
import App from './app.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import apexchart from './plugins/apexcharts'

import './assets/styles/index.css'

Vue.config.productionTip = false

Vue.use(require('vue-moment'))

new Vue({
  router,
  vuetify,
  apexchart,
  render: h => h(App),
}).$mount('#app')
