<template>
  <div>
    <img :src="images[0]" alt="Setup image" class="image">
    <h2 class="name">{{ name }}</h2>

    <ui-fab
        color="primary"
        icon="thumb_up"
        tooltip-position="top center"
        @click="upvote()"
        :tooltip="votes.length+''"
        size="small"
        class="like"
    ></ui-fab>


    <p class="description">{{ description }}</p>
  </div>
</template>

<script>
import { BASE } from "../api";
import * as store from '../store';

export default {
  props: {
    name: String,
    description: String,
    author: String,
    images: Array,
    votes: Array,
    id: Number,
  },
  methods: {
    upvote: async () => {
      const id = parseInt(this.id);
      const res = await fetch(BASE+`/api/posts/${this.id}/upvotes`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.get("token")}`
          }
      });

      console.log(await res.json());
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 20%;
  background-color: white;

  margin-left: 10px;
  margin-top: 10px;

  border-radius: 10px;

  display: inline-block;

  .image {
    width: 100%;
    height: auto;
  }

  .image-darker {
    background-color: rgba(0, 0, 0, 0.5);
    width: 15%;
    height: 5%;
    z-index: 1000;
    position: absolute;
    border-radius: 0;
    top: 0;
  }

  .name {
    font-family: 'Raleway';
    font-weight: bold;
  }

  .description {
    font-family: 'Raleway';
  }

  .user {
    background-color: white;
    font-family: 'Raleway';

    position: absolute;
    top: 10%;
  }

  .like {
    float: right;
  }
}
</style>
