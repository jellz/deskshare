<template>
  <div class="home">
    <SetupCard :votes="10" :name="'Hax0r S3tup'" :author="'a person'" :images="['https://img00.deviantart.net/83f9/i/2010/066/6/d/epic_computer_setup_by_rokr424.jpg']"/>
  </div>
</template>

<script>
import SetupCard from '../components/SetupCard.vue';

export default {
  name: 'home',
  components: {
    SetupCard,
  }
}
</script>
