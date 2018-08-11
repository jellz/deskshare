<template>
  <ui-toolbar brand="DeskShare" title="">
      <div slot="actions">

        <div v-if="loggedIn === true">
          <ui-button color="primary" :size="size">Submit New Setup</ui-button>

          <ui-button color="primary" :size="size" class="mysetups">My Setups</ui-button>
        </div>
        <div v-else>
          <ui-button color="primary" :size="size">Login/Signup</ui-button>
        </div>
      </div>
  </ui-toolbar>
</template>

<script>
import * as store from '../store';

export default {
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    this.loggedIn = store.isLoggedIn();
  }
}
</script>

<style lang="scss" scoped>
</style>
