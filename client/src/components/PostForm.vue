<template>
<div>
    <ui-textbox label="Title" placeholder="Enter your title" v-model="postTitle" :maxlength="35" :invalid="postTitle.length > 16" error="The title may not be more than 35 characters"></ui-textbox> <!-- min 2 max 35 chars -->
    <ui-textbox help="Max 280 chars" label="Description" placeholder="Enter a short description" v-model="postDesc" :maxlength="280" :invalid="postDesc.length > 280" error="The title may not be more than 280 characters"></ui-textbox>
    <ui-fileupload color="primary" name="postImages" label="Select files" type="secondary" accept="image/*" multiple></ui-fileupload>
    <br><ui-button color="primary" icon="send" icon-position="left" size="normal" @click="submit">Submit</ui-button>
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
            publishRequestInProgress: false
        };
    },
    mounted() {
        this.loggedIn = store.isLoggedIn();
    },
    methods: {
        async submit() {
            this.publishRequestInProgress = true;
            const input = document.getElementsByClassName("ui-fileupload__input")[0];
            // if (input.files.length > 10) return alert("too many files"); // 15 is too much (^; 
            let urls = [];
            for(let file of input.files) {
                const url = await imsave("82dc9da3f843ede", file);
                urls.push(url);
            }
            // let primaryImage = ???? If we want to add a way for people to select which image shows on a thumbnail or something
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
        }
    }
};
</script>

<style lang="scss" scoped>
div {
    width: 50%;
    height: 10%;
    background-color: white;
    margin-left: 20%;
    margin-top: 30px;
    border-radius: 10px;
}
</style>