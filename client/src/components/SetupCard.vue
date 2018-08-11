<template>
  <div>
    <img :src="images[0]" alt="Setup image" class="image">
    <h2 class="name">{{ name }}</h2>

    <ui-fab
        color="primary"
        icon="thumb_up"
        tooltip-position="top center"
        :tooltip="votes+''"
        size="small"
        class="like"
    ></ui-fab>


    <p class="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    author: String,
    images: Array,
    votes: Number
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 20%;
  height: 10%;
  background-color: white;

  margin-left: 10px;
  margin-top: 10px;

  border-radius: 10px;

  display: block;

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
    margin-top: -85%;
    margin-right: 1%;
  }
}
</style>
