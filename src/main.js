import { createApp } from 'vue'
import './assets/styles/tokens.css'
import App from './App.vue'
import vReveal from './directives/vReveal.js'
import vMagnetic from './directives/vMagnetic.js'

const app = createApp(App)
app.directive('reveal', vReveal)
app.directive('magnetic', vMagnetic)
app.mount('#app')
