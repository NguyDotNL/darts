import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Dashboard from '../pages/dashboard.vue'
import PassThrough from '../pages/passthrough.vue'
import Players from '../pages/players.vue'
import PlayersStatistic from '../pages/player-statistics.vue'
import MatchStatistics from '../pages/match-statistics.vue'


const routes = [
  {
    path: '/',
    exact: true,
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/spelers',
    component: PassThrough,
    children: [
      {
        path: '',
        name: 'Players',
        component: Players,
      },
      {
        path: ':player_id',
        name: 'PlayerStatistic',
        component: PlayersStatistic,
      },
    ],
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

Vue.use(VueRouter)

export default router
