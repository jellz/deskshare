import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue';
import NewPost from './views/NewPost.vue';

import * as store from './store';
import * as api from './api';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/newPost',
      component: NewPost,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.isLoggedIn) {
    console.log('hi');
  } else {
    next();
  }
});

export default router;
