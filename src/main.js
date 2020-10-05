import Vue from 'vue'
import App from './app.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import './assets/styles/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
