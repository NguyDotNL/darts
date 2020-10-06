import { render } from '@testing-library/vue'
import '@testing-library/jest-dom'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const renderWithVuetify = (component, options, cb) => {
  const root = document.createElement('div')
  root.setAttribute('data-app', 'true')
  
  return render(component, 
    {
      container: document.body.appendChild(root),
      vuetify: new Vuetify(),
      ...options,
    },
    cb,
  )
}

export * from '@testing-library/vue'

export { renderWithVuetify as render }
