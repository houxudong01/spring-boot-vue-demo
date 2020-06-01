<template>
  <div id="app">
   
    <transition mod="out-in">
      <router-view>

      </router-view>
    </transition>
    </div>

</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .app {
    background-color: rgba(10, 87, 110, 0.25);
    height: 1000px;
    width: 100%;
  }
</style>