import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'

import Criminals from '../views/Criminals/Criminals.vue'
import AddCriminal from '../views/Criminals/AddCriminal.vue'
import UpdateCriminal from '../views/Criminals/UpdateCriminal.vue'

import Records from '../views/Records/Records.vue'
import NewCases from '../views/Records/childRoutes/NewCases.vue'
import PendingCases from '../views/Records/childRoutes/PendingCases.vue'
import CaseArchive from '../views/Records/childRoutes/CaseArchive.vue'
import SendUnresolvedMsg from '../views/Records/SendUnresolvedMsg.vue'

import VolumeThreshold from '../views/VolumeThreshold/VolumeThreshold.vue'

import Offences from '../views/Offences/Offences.vue'
import AddOffence from '../views/Offences/AddOffence.vue'
import UpdateOffence from '../views/Offences/UpdateOffence.vue'

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
      path: '/UpdateCriminal/:_id',
      name: 'UpdateCriminal',
      component: UpdateCriminal
    },
    {
      path: '/records',
      name: 'Records',
      component: Records,
      children: [
        {
        path: 'newcases',
        name: 'NewCases',
        component: NewCases        
        },
        {
          path: 'pendingcases',
          name: 'PendingCases',
          component: PendingCases        
          },
          {
            path: 'casearchive',
            name: 'CaseArchive',
            component: CaseArchive     
            },
      ]
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
    },
    {
      path: '/offences',
      name: 'Offences',
      component: Offences
    },
    {
      path: '/addoffence',
      name: 'AddOffence',
      component: AddOffence
    },
    {
      path: '/updateoffence/:_id',
      name: 'UpdateOffence',
      component: UpdateOffence
    }
  ]
})
