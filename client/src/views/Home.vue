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
        this.setups = (await (await fetch(BASE+"/api/posts")).json()).posts;
    }
}
</script>

<style lang="scss" scoped>
.home {
    margin-top: 2rem; // avoid the fab touching the navbar
}
</style>
