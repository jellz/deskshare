<template>
  <div class="home">
    <div class="no-posts" v-if="setups.length === 0">
      <h2>
        There aren't any setups here yet... add one?
      </h2>
      <ui-button color="primary" class="button" @click="$router.push('/newPost')">Submit a new Setup!</ui-button>
    </div>

    <SetupCard
        v-for="setup in setups"
        :key="setup.id"
        :votes="setup.upvotes"
        :name="setup.title"
        :author="'a person'"
        :images="setup.images"
        :description="setup.description"
        :id="setup.id"/>
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
            return 1;
          } else if (obj1.upvotes > obj2.upvotes) {
            return -1;
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

.no-posts {
  h2 {
    font-family: 'Raleway';
    width: 50%;

    position: absolute;
    left: 25%;
    right: 75%;

    text-align: center;
    top: 30%;
  }

  button {
    width: 20%;

    position: absolute;
    left: 40%;
    right: 60%;

    text-align: center;

    top: 40%;
  }
}
</style>
