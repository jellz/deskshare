<template>
      <form action="">
      <ui-textbox label="Title" placeholder="Enter your title" v-model="postTitle"></ui-textbox> <!-- min 2 max 35 chars -->
      <ui-textbox help="Max 280 chars" label="Description" placeholder="Enter a short description" v-model="postDesc"></ui-textbox>
      <ui-fileupload color="primary" name="postImages"></ui-fileupload>
      <ui-confirm 
                  confirm-button-icon="public"
                  confirm-button-text="Publish"
                  deny-button-text="Cancel"
                  ref="publishConfirm"
                  
                  title="Publish Post"
                  type="primary"
                  :close-on-confirm="false"
                  :loading="publishRequestInProgress"
                  @confirm="onConfirmPublish"
                  @deny="onDenyPublish"
                  >
                  Publish setup for the world to see?
                  </ui-confirm>
            
</template>

<script>
import * as store from "../store";

export default {
  data() {
    return {
      loggedIn: false
    };
  },
  mounted() {
    this.loggedIn = store.isLoggedIn();
  }
};
</script>

<style>
</style>