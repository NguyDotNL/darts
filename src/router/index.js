import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
const Dashboard = () => import('../pages/dashboard.vue')
const PassThrough = () => import('../pages/passthrough.vue')
const Players = () => import('../pages/players.vue')
const PlayersStatistic = () => import('../pages/player-statistics.vue')
const MatchStatistics = () => import('../pages/match-statistics.vue')
const FillInMachPage = () => import('../pages/fill-in-match')
const MatchAdd = () => import('../pages/match-add.vue')
const MatchEdit = () => import('../pages/match-edit.vue')


export const routes = [
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
        path: '',
        redirect: '/',
      },
      {
        path: 'toevoegen',
        name: 'MatchAdd',
        component: MatchAdd,
      },
      {
        path: ':id/instellingen',
        name: 'MatchEdit',
        component: MatchEdit,
      },
      {
        path: ':id/invullen',
        name: 'MatchFillIn',
        component: FillInMachPage,
      },
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
