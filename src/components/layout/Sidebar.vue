<template>
<div id="sidebar">
<aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/'} "><li><a>Dashboard</a></li></router-link>
  </ul>
  <p class="menu-label">
    Criminals
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/criminals'} "><li><a>Manage Criminals</a></li></router-link>
  </ul>
  <p class="menu-label">
    Telegram Bot
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/telegrambot'} "><li><a>Manage Telegram Bot</a></li></router-link>
  </ul>
  <p class="menu-label">
    Sound Threshold
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/volumethreshold'} "><li><a>Manage Sound Threshold</a></li></router-link>
  </ul>
  <p class="menu-label">
    Offences
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/offences'} "><li><a>Manage Offences</a></li></router-link>
  </ul>
</aside>
</div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<style>
#sidebar {
  float: left;
  position: absolute;
  top: 6%;
  left: 0px;
  bottom: 0;
}

#sidebar .menu {
  height: 100%;
  float: left;
  padding: 30px 0 50px;
  width: 230px;
  background: #FFF;
  box-shadow: 0 2px 10px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
}
#sidebar .menu-label {
    padding-left: 18px;
  }
#sidebar .menu-list li a {
  font-size: 15px;
  padding-left: 34px;
}
</style>
