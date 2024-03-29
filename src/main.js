// import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
import Icons from './components/icon/index.js'
import '@/styles/main.less'
const app = createApp(App)
app.use(Icons)

// app.use(createPinia())
// app.use(router)

app.mount('#app')
