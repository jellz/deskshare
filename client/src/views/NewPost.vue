<template>
  <div class="post-form">
    <PostForm />
  </div>
</template>

<script>
// @ is an alias to /src
import PostForm from '@/components/PostForm.vue'

export default {
  name: 'newPost',
  components: {
    PostForm
  }
}
</script>
