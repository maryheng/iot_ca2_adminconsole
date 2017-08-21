<template>
<div id="NavbarContainer">
<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
      <p>IOT_CA2</p>
    </div>
  </div>
</nav>
</div>
</template>

<script>
export default {
  components: 'navbar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  height: 60px;
}

p {
  font-size: 21px;
  margin: 1% 0% 0% 5%;
  font-weight: bold;
}

#NavbarContainer {
  position: absolute;
  width: 100%;
  z-index: 50; 
}  

</style>
