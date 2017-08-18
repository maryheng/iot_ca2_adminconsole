import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Criminals from '../views/Criminals/Criminals.vue'
import TelegramBot from '../views/TelegramBot/TelegramBot.vue'
import VolumeThreshold from '../views/VolumeThreshold/VolumeThreshold.vue'

Vue.use(Router)

export default new Router({
  saveScrollPosition: true,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/criminals',
      name: 'Criminals',
      component: Criminals
    },
    {
      path: '/telegrambot',
      name: 'TelegramBot',
      component: TelegramBot
    },
    {
      path: '/volumethreshold',
      name: 'VolumeThreshold',
      component: VolumeThreshold
    }
  ]
})
