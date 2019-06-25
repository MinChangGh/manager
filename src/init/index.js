import Vue from 'vue';

//全局函数
import common from '@/common';

Vue.use(common);

// 全局指令
// import * as directive from '@/directive/directive'
// Object.keys(directive).forEach(key => {
//   Vue.directive(key, directive[key])
// })

//全局过滤器
import * as filters from '@/filters/index'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

import './permission';

//icon
import '@/icons/index';

//自定义全局样式
import '@/styles/index.scss';
// import 'vant/lib/uploader/style';

//rem适配
// import 'lib-flexible';

//引入mock模块
import Mock from '@/mock/index';

Mock.start();
import { Uploader } from 'vant';

Vue.use(Uploader);

//vux组件
import {ToastPlugin, AlertPlugin, ConfirmPlugin} from 'vux';

Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);

function resize() {
  let deviceWidth = document.documentElement.clientWidth;
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
}

resize()
window.onresize = function () {
  resize()
}
