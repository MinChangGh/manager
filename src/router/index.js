import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [

  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: _import('home/index'),
    name: 'home',
    meta: {
      title: '首页',
      cache: true,
    }
  },
  {
    path: '/list',
    component: _import('list/detail'),
    name: 'list',
    meta: {
      title: '列表',
      cache: false,
    }
  },
  {
    path: '/edit',
    component: _import('list/edit'),
    name: 'edit',
    meta: {
      title: '编辑',
      cache: false,
    }
  },

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}), // 跳转到新的页面时,定位到最顶端
  routes: constantRouterMap,
})
