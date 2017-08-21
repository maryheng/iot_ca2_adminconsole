<template>
  <div id="criminalsContainer">
    <p class="subtitle is-4">Manage Telegram Bot</p>
    <div class="box">
      <!--Vue Table-->
      <vuetable
      ref="vuetable"
      :api-url="apiUrl"
      :fields="fields"
      @onBtnClick="onActions"
      ></vuetable>      
    </div>
  </div>
</template>

<script>
import Vuetable from '../../components/vuetable/Vuetable.vue'
import CustomActions from '../../components/vuetable/CustomActions.vue'

export default {
  components: {
    Vuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: 'insertURLhere',
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'Name',
          title: 'Name'
        },
        {
          name: 'Description',
          title: 'Description'
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
      router.push({ name: 'SendUnresolvedMsg', params: { staffId: action.data.staffId } })
    }
  }
}
</script>

<style>
#criminalsContainer > p {
  font-size: 23px;
  font-weight: 300;
}
</style>
