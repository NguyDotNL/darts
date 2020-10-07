import Vue from 'vue'
import Vuetify from 'vuetify'
import router from '../router'
import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'

Vue.use(Vuetify)

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
