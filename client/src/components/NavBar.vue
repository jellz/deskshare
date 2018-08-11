<template>
  <ui-toolbar brand="DeskShare" title="">
      <div slot="actions">

        <div v-if="loggedIn === true">
          <ui-button color="primary" :size="size" @click="newSetup()">Submit New Setup</ui-button>

          <ui-button color="primary" :size="size" class="mysetups">My Setups</ui-button>
        </div>
        <div v-else>
          <ui-button color="primary" :size="size" @click="login()">Login/Signup</ui-button>
        </div>
      </div>
  </ui-toolbar>
</template>

<script>
import * as store from '../store';
import * as api from '../api';

export default {
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    this.loggedIn = store.isLoggedIn();
  },
  methods: {
    login() {
      api.login();
    },
    newSetup() {
      this.$router.push('/newPost');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
