<template>
  <div class="post-form">
    <PostForm />
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'

export default {
  name: 'newPost',
  components: {
    PostForm
  }
}
</script>
