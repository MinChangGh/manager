<template>
  <div class="menus">
    <slidebar></slidebar>
    <div class="view">
      <router-view></router-view>
    </div>

  </div>
</template>


<script>
  import slidebar from '@/components/slideBar'
  import {
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    TransferDom
  } from 'vux'
  import {mapstate} from 'vuex'

  export default {
    name: 'APP',
    data() {
      return {}
    },
    components: {
      slidebar,
      Radio,
      Group,
      Cell,
      Badge,
      Drawer,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      Loading,
      Actionsheet
    },
    directives: {
      TransferDom
    },
    created() {
      setTimeout(() => {
        if (localStorage.menus) {
          let val = JSON.parse(localStorage.menus)
          this.$store.commit('RELOAD_MENU', val)
        } else {
          let menus = JSON.stringify(this.$store.state.pbCtrl)
          localStorage.menus = menus
        }
      }, 300)
    },
    beforeRouteLeave(to, from, next) {
      next()
    },
    computed: {
      drawerVisibility() {
        return this.$store.state.pbCtrl.drawerVisibility
      },
      isShowNav() {
        if (this.$route.fullPath == '/home') {
          return true
        } else {
          return false
        }
      },
      isShowBar() {
        // if (this.entryUrl.indexOf('hide-tab-bar') > -1) {
        //   return false
        // }
        return true
      },
      key() {
        return this.$route.path + Math.random();
      },

      rightOptions() {
        return {
          showMore: true
        }
      },

    },
    methods: {}

  }
</script>
<style scoped lang="scss">
  @import "@/styles/mixin.scss";

  .active {
    transition: 0.5s;
    max-height: 300px !important;
  }

  .unactive {
    max-height: 0;
    overflow: hidden;
  }

  .menus {
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  .view {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
  }


</style>
