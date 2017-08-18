<template>
  <div id="criminalsContainer">
    <p class="subtitle is-4">Manage Criminals</p>
    <div class="box">
      <router-link to="/addcriminal">
        <button type="submit" class="button is-info">Add a Criminal</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
#criminalsContainer > p {
  font-size: 23px;
  font-weight: 300;
}
</style>
