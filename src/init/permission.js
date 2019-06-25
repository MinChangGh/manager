import router from '@/router'
import store from '@/store'
import {getCno} from '@/utils/common'
import {ToastPlugin} from 'vux';
import Vue from 'vue';

Vue.use(ToastPlugin);

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // if (getCno() == 'undefined') {
  //   store.dispatch('SetCno').then((response) => {
  //   }).catch(() => {
  //   })
  // }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

// router.afterEach(() => { })
