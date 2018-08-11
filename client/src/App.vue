<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  }
}
</script>


<style lang="scss">
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}
</style>
