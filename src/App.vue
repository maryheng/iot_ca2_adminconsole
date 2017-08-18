<template>
  <div id="app">
    <navbar></navbar>
    <sidebar></sidebar>
    <app-main></app-main>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import AppMain from './components/layout/AppMain.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style>
@import '~bulma/css/bulma.css';
</style>
