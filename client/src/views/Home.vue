<template>
  <div class="home">
    <SetupCard
        v-for="setup in setups"
        :key="setup.id"
        :votes="10"
        :name="setup.title"
        :author="'a person'"
        :images="setup.images"
        :description="setup.description"/>
  </div>
</template>

<script>
import SetupCard from '../components/SetupCard.vue';
import { BASE } from "../api"

export default {
    name: 'home',
    components: {
        SetupCard,
    },
    data: () => ({
        setups: []
    }),
    async mounted() {
        const setups = (await (await fetch(BASE+"/api/posts")).json()).posts;

        const compare = (obj1, obj2) => {
          if(obj1.upvotes < obj2.upvotes) {
            return -1;
          } else if (obj1.upvotes > obj2.upvotes) {
            return 1;
          }

          return 0;
        }

        setups.sort(compare);

        this.setups = setups;
    }
}
</script>

<style lang="scss" scoped>
.home {
    margin-top: 2rem; // avoid the fab touching the navbar
}
</style>
