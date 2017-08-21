import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'

import Criminals from '../views/Criminals/Criminals.vue'
import AddCriminal from '../views/Criminals/AddCriminal.vue'
import UpdateCriminal from '../views/Criminals/UpdateCriminal.vue'

import TelegramBot from '../views/TelegramBot/TelegramBot.vue'
import SendUnresolvedMsg from '../views/TelegramBot/SendUnresolvedMsg.vue'

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
      path: '/addcriminal',
      name: 'AddCriminal',
      component: AddCriminal
    },
    {
      path: '/updatecriminal/:criminalId',
      name: 'UpdateCriminal',
      component: UpdateCriminal
    },
    {
      path: '/telegrambot',
      name: 'TelegramBot',
      component: TelegramBot
    },
    {
      path: '/sendunresolvedmsg',
      name: 'SendUnresolvedMsg',
      component: SendUnresolvedMsg
    },
    {
      path: '/volumethreshold',
      name: 'VolumeThreshold',
      component: VolumeThreshold
    }
  ]
})
