import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Dashboard from '../pages/dashboard.vue'
import PassThrough from '../pages/passthrough.vue'
import Players from '../pages/players.vue'
import PlayersStatistic from '../pages/player-statistics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      breadcrumb: [
        {
          name: 'Dashboard',
        },
      ],
    },
  },
  {
    path: '/spelers',
    name: 'Spelers',
    component: PassThrough,
    children: [
      {
        path: '',
        component: Players,
        meta: {
          breadcrumb: [
            {
              name: 'Dashboard',
              link: '/',
            },
            {
              name: 'Spelers',
              disabled: true,
            },
          ],
        },
      },
      {
        path: ':name',
        component: PlayersStatistic,
        meta: {
          breadcrumb: [
            {
              name: 'Dashboard',
              link: '/',
            },
            {
              name: 'Spelers',
              link: '/Spelers',
            },
            {
              name: route => {route.name},
              disabled: true,
            },
          ],
        },
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
