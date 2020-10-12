import { render, Vue } from '@/test/test-wrapper'
// import { routes } from '@/router'
// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import { render } from '@testing-library/vue'
import Breadcrumbs from './Breadcrumbs.vue'

// Vue.use(Vuetify)

const routes = [
  {
    path: '/',
    exact: true,
    name: 'Dashboard',
    component: Breadcrumbs,
  },
  {
    path: '/spelers',
    component: Breadcrumbs,
    children: [
      {
        path: '',
        name: 'Players',
        component: Breadcrumbs,
      },
      {
        path: ':player_id',
        name: 'PlayerStatistic',
        component: Breadcrumbs,
      },
    ],
  },
  {
    path: '/wedstrijd',
    component: Breadcrumbs,
    children: [
      {
        path: '',
        component: Breadcrumbs,
      },
      {
        path: ':id',
        name: 'MatchStatistics',
        component: Breadcrumbs,
      },
    ],
  },
]

test('Increment page on click next', async () => {
  const { container, debug } = render(Breadcrumbs, { routes }, (vue, store, router) => {
    console.log(router)
    router.push('/spelers/e9dbe7ac-d51c-4555-ad1f-ebcb89037e1c')
  })

  await Vue.nextTick()

  debug()

  // expect(Breadcrumbs).not.toHaveClass('v-navigation-drawer--open')
})
