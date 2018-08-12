<template>
    <div>
        <SetupCard
            v-for="setup in setups"
            :key="setup.id"
            :votes="setup.upvotes.length"
            :name="setup.title"
            :author="'a person'"
            :images="setup.images"
            :description="setup.description"/>
    </div>
</template>

<script>
import SetupCard from '../components/SetupCard.vue';
import { BASE } from "../api"
import * as store from '../store';

export default {
    name: 'MySetups',
    components: {
        SetupCard,
    },
    data: () => ({
        setups: []
    }),
    async mounted() {
        const res = await fetch(BASE+"/api/users/@me", {
            headers: {
                Authorization: `Bearer ${store.get("token")}`
            }
        });
        const resData = await res.json();
        const posts = await (await fetch(`${BASE}/api/users/${resData.me.id}/posts`)).json();
        this.setups = posts.posts;
    }
}
</script>

<style>

</style>
