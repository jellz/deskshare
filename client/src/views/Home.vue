<template>
  <div class="home">
    <SetupCard :votes="10" :name="'This is a name and it is char limit'" :author="'a person'" :images="['https://img00.deviantart.net/83f9/i/2010/066/6/d/epic_computer_setup_by_rokr424.jpg']" :description="'This is a cool description because its the character limitThis is a cool description because its the character limitThis is a cool description because its the character limit. memes memes memes mem'"/>
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
