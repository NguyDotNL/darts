import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Dashboard from '../pages/dashboard.vue'
import MatchStatistics from '../pages/match-statistics.vue'
import PassThrough from '../pages/passthrough.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/wedstrijd',
    component: PassThrough,
    children: [
      {
        path: ':id',
        name: 'MatchStatistics',
        component: MatchStatistics,
      },
    ],
   
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
