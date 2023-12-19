// Import our custom CSS
import './scss/styles.scss'

import { createApp, h } from 'vue'
import App from './App.vue'
const FakeComponent = {
    template: `<p>I'm a fake!</p>`
}
const NotFoundComponent = { template: '<p>Страница не найдена</p>' }

const routes = {
    '/': App,
    '/fake': FakeComponent,
};

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },

  render() {
    return h(this.CurrentComponent);
  }
};

createApp(SimpleRouter).mount('#app');
