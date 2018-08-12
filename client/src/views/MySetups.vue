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

      const posts = await fetch(`${BASE}/api/users/${(await res.json()).me.id}/posts`);

      console.log(await posts.text());
    }
}
</script>

<style>

</style>
