<template>
  <div id="criminalsContainer">
    <p class="subtitle is-4">Manage Records of Cases</p>
    <div class="box">
      <tabs>
        <!--Visitor Details Tab-->
        <tab name="New Cases" :selected="true">       
          <router-view></router-view>
        </tab>

        <!--Purpose of Visit Tab-->
        <tab name="Pending Cases">
          <router-view></router-view>          
        </tab>     

        <!--Purpose of Visit Tab-->
        <tab name="Case Archive">
          <router-view></router-view>          
        </tab>           

      </tabs>  
    </div>
  </div>
</template>

<script>
import tabs from '../../components/layout/Tabs.vue'
import tab from '../../components/layout/Tab.vue'

export default {
  components: {
    tabs,
    tab
  },
  computed: {
    href () {
      return '/records/newcases' + this.name.toLowerCase().replace(/\s+/g, '')
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
