<template>
<div>
      <form action="">
      <ui-textbox label="Title" placeholder="Enter your title" v-model="postTitle" :maxlength="35" :invalid="postTitle.length > 16" error="The title may not be more than 35 characters"></ui-textbox> <!-- min 2 max 35 chars -->
      <ui-textbox help="Max 280 chars" label="Description" placeholder="Enter a short description" v-model="postDesc" :maxlength="280" :invalid="postDesc.length > 16" error="The title may not be more than 280 characters"></ui-textbox>
      <ui-fileupload color="primary" name="postImages"></ui-fileupload>
      <ui-confirm 
                  confirm-button-icon="public"
                  confirm-button-text="Publish"
                  deny-button-text="Cancel"
                  
                  title="Publish Post"
                  type="primary"
                  :close-on-confirm="false"
                  @confirm="onConfirmPublish"
                  @deny="close()"
                  >
                  Publish setup for the world to see?
      </ui-confirm>
      </form>
</div>
</template>

<script>
import * as store from "../store";

export default {
  data() {
    return {
        postTitle: '',
        postDesc: '',
        confirmResult: '',
        publishRequestInProgress: false
    };
  },
  mounted() {
    this.loggedIn = store.isLoggedIn();
  },
  methods: {
    onConfirmPublish() {
            this.publishRequestInProgress = true;
            setTimeout(() => {
                this.publishRequestInProgress = false;
                close();
                this.confirmResult = 'The setup was published.';
            }, 5000);
        }
  }
};
</script>

<style>
</style>