import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Dashboard from '../pages/dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
]

const router = new VueRouter({
  routes,
})

export default router
