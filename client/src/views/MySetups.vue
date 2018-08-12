<template>
  <h1>hi</h1>
</template>

<script>
import SetupCard from '../components/SetupCard.vue';
import { BASE } from "../api"
import * as store from '../store';

export default {
    name: 'home',
    components: {
        SetupCard,
    },

    async mounted() {
      const res = await fetch(BASE+"/api/users/@me", {
        headers: {
            Authorization: `Bearer ${store.get("token")}`
        }
      });

      console.log(await res.json().me.id);
      const posts = await (await fetch(`/api/users/${await res.json().me.id}/posts`)).json();

      console.log(posts);
    }
}
</script>

<style>

</style>
