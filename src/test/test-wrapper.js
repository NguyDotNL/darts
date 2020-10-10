import Vue from 'vue'
import Vuetify from 'vuetify'
import router from '../router'
import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'

Vue.use(Vuetify)

// Mock client imports
jest.mock('@/clients/dashboard.client', () => require('@/clients/dashboard.mock.js').default)
jest.mock('@/clients/match.client', () => require('@/clients/match.mock.js').default)
jest.mock('@/clients/players.client', () => require('@/clients/players.mock.js').default)

const renderWithVuetify = (component, options, cb) => {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')
  
  return render(component, 
    {
      container: document.body.appendChild(root),
      vuetify: new Vuetify(),
      router,
      ...options,
    },
    cb,
  )
}

export * from '@testing-library/vue'

export { renderWithVuetify as render }
