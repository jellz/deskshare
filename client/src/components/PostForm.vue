<template>
<div class="form-display">
    <ui-snackbar v-if="donePublishing">Post published</ui-snackbar>
    <ui-snackbar v-if="badForm">Check errors before submitting!</ui-snackbar>
    <ui-textbox label="Title" placeholder="Enter your title" v-model="postTitle" :maxlength="35" :invalid="postTitle.length > 35" error="The title may not be more than 35 characters"></ui-textbox> <!-- min 2 max 35 chars -->
    <ui-textbox label="Description" placeholder="Enter a short description" v-model="postDesc" :maxlength="280" :invalid="postDesc.length > 280" error="The description may not be more than 280 characters"></ui-textbox>
    <ui-fileupload color="primary" name="postImages" label="Select files" type="secondary" accept="image/*" multiple></ui-fileupload>
    <br><ui-button color="primary" icon="send" icon-position="left" size="normal" @click="submit" :loading="publishRequestInProgress" raised>Submit</ui-button>
</div>
</template>

<script>
import * as store from "../store";
import * as imsave from "imsave";
import { BASE } from "../api";

export default {
    data() {
        return {
            postTitle: '',
            postDesc: '',
            confirmResult: '',
            publishRequestInProgress: false,
            donePublishing: false,
            badForm: false
        };
    },
    mounted() {
        this.loggedIn = store.isLoggedIn();
    },
    methods: {
        async submit() {
            this.publishRequestInProgress = true;
            this.badForm = false;
            const input = document.getElementsByClassName("ui-fileupload__input")[0];
            // if (input.files.length > 10) return alert("too many files"); // 15 is too much (^;
            let urls = [];
            for(let file of input.files) {
                const url = await imsave("82dc9da3f843ede", file);
                urls.push(url);
            }
            // let primaryImage = ???? If we want to add a way for people to select which image shows on a thumbnail or something
            if (this.postTitle.length <= 35 && this.postDesc.length <= 280) {
                this.publishRequestInProgress = true;
                const res = await fetch(BASE+"/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${store.get("token")}`
                    },
                    body: JSON.stringify({
                        title: this.postTitle,
                        description: this.postDesc,
                        images: urls
                    })
                });

                this.donePublishing = true;

                this.$router.push('/');
            } else {
                this.badForm = true;
                this.publishRequestInProgress = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.form-display {
  margin-top: 1rem;
  padding: 3rem;
  background-color: white;
  border-radius: 1rem;
  .ui-fileupload {
    margin-bottom: 1rem;
  }
}
</style>
