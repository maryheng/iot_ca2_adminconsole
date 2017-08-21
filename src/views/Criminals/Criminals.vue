<template>
  <div id="criminalsContainer">
    <p class="subtitle is-4">Manage Criminals</p>
    <div class="box">
      <router-link to="/addcriminal">
        <button type="submit" class="button is-primary">Add a Criminal</button>
      </router-link>
      <br><br>
      <!--Vue Table-->
      <vuetable
      ref="vuetable"
      :api-url="apiUrl"
      :fields="fields"
      @onBtnClick="onActions"
      ></vuetable>      
      <br>
    </div>
  </div>
</template>

<script>
import Vuetable from '../../components/vuetable/Vuetable.vue'
import CustomActions from '../../components/vuetable/CustomActions.vue'
import { criminalsUrl } from '../../config'
import router from '../../router'

export default {
  components: {
    Vuetable,
    CustomActions
  },
  data () {
    return {
      apiUrl: criminalsUrl,
      fields:
      [
        {
          name: '__sequence', // index number for rows in vuetable
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'name',
          title: 'Name'
        },
        {
          name: 'description',
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
      console.log(action)
      router.push({ name: 'UpdateCriminal', params: { _id: action.data._id } })
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
