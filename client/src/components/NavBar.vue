<template>
  <ui-toolbar brand="DeskShare" title="" :removeNavIcon="true">
      <div slot="brand" @click="goHome()" class="brand"><img src="/logo.png" alt=""></div>
      <div slot="actions">

        <div v-if="loggedIn">
          <ui-button color="primary" @click="newSetup()">Submit Your Setup</ui-button>

          <ui-button color="primary" class="mysetups">My Setups</ui-button>

          <ui-button color="primary" class="mysetups" @click="logout()">Logout</ui-button>
        </div>
        <div v-else>
          <ui-button color="primary" @click="login()">Login</ui-button>
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
    },
    mySetups() {
      this.$router.push('/myPosts');
    },
    goHome() {
      this.$router.push('/');
    },
    logout() {
      store.remove('token');
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-toolbar {
  .ui-button {
    margin: 0.5rem;
  }
  .brand {
    cursor:pointer;
    margin: auto;
    img {
      height: 1.5rem;
    }
  }
  padding: 2rem;
}

</style>
