<template>
  <div id="criminalsContainer">
    <br>
      <!--Vue Table-->
      <vuetable
      ref="vuetable"
      :api-url="apiUrl"
      :fields="fields"
      @onBtnClick="onActions"
      ></vuetable>      
      <br>
  </div>
</template>

<script>
import Vuetable from '../../../components/vuetable2/Vuetable2.vue'
import CustomActions from '../../../components/vuetable2/CustomActions2.vue'
import { caseArchiveUrl } from '../../../config'
import router from '../../../router'

export default {
  components: {
    Vuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: caseArchiveUrl,
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'location',
          title: 'Location'
        },
        {
          name: 'triggeredSoundValue',
          title: 'Triggered Sound Value'
        },
        {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ]      
    }
  },
  methods: {
    // Click "Edit" Button -> routes user to update page
    onActions (action, data) {
      router.push({ name: 'ReviewCaseArchived', params: { _id: action.data._id } })
    }
  }
}
</script>

<style>
#criminalsContainer > p {
  font-size: 23px;
  font-weight: 300;
}

.table {
  width: 100%;
}
</style>
