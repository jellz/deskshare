<template>
  <div>
    <img :src="images[0]" alt="" class="image">
    <h2 class="name">{{ name }}</h2>
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
  background-color: #f7fcff;

  border-radius: 7px;

  .name {
    color: black;
    font-family: 'Raleway';

    font-weight: bold;
    width: 100%;
    background-color: #f7f7f7;
  }

  .image {
    width: 90%;
    border-radius: 6px;
    margin-top: 2%;
    margin-right: 5%;
    margin-left: 5%;
  }
}
</style>
