<template>
  <div>
    <carousel perPage=1>
        <slide v-for="img of images" :key="img">
            <img :src="img" alt="Setup image" class="image">
        </slide>
    </carousel>
    <h2 class="name">{{ name }}</h2>

    <ui-fab
        :color="hasLiked ? 'primary' : 'green'"
        icon="thumb_up"
        tooltip-position="top center"
        @click="upvote"
        :tooltip="data_votes.length+''"
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
  data() {
    return {
      color: 'primary',
      hasLiked: false,
      user_id: 0,
      data_votes: []
    };
  },
  methods: {
    async upvote() {
      const id = parseInt(this.id);
      const res = await fetch(BASE+`/api/posts/${this.id}/upvotes`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.get("token")}`
          }
      });

      const data = await res.json();

      console.log(data);

      if(data.upvotes.includes(this.user_id)) {
        this.hasLiked = true;
        this.data_votes = data.upvotes;
      } else {
        this.hasLiked = false;
        this.data_votes = data.upvotes;
      }
    }
  },
  async mounted() {
    this.data_votes = this.votes;
    const res = await fetch(BASE+"/api/users/@me", {
        headers: {
            Authorization: `Bearer ${store.get("token")}`
        }
    });
    const resData = await res.json();
    const id = resData.me.id;

    this.user_id = id;

    if(this.votes.includes(id)) {
      this.hasLiked = true;
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
