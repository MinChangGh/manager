<template>
  <div class="homes">
    <x-header
      :title='title'
      :right-options="{showMore: true}"
      @on-click-more="showMenus = true">
    <span slot="overwrite-left" @click="setDrawer">
            <x-icon type="navicon" size="35"
                    style=" z-index:2000;fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
    </x-header>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="checkMenus"></actionsheet>
    </div>
    <grid :cols="3" :show-lr-borders="false">
      <grid-item v-for="(item,index) in menusList" :key="index">
        <div @click="tolist(item.id,item.name)" class="itemsbox">
          <p>
            <svg-icon icon-class="goods"></svg-icon>
          </p>
          <span class="grid-center">{{item.name}}</span>
        </div>
      </grid-item>
    </grid>
  </div>
</template>

<script>
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
    TransferDom,
    Grid, GridItem, GroupTitle
  } from 'vux'

  import scroll from "@/components/scroll.vue";
  import {getmenu} from '@/api/api'

  export default {
    data() {
      return {
        showMenus: false,
        menus: {
          m1: '宝岛',
          m2: '光明'

        },
        pn: 1,
        shops: localStorage.shop,
        menusList: []
      };
    },
    components: {
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
      Actionsheet,
      Grid, GridItem, GroupTitle
    },
    directives: {
      TransferDom
    },
    created() {
      let form = new FormData()
      form.append('a', 12)
      this.getmenus(form)
      setInterval(() => {
        this.pn++
      }, 100)
    },
    methods: {
      getmenus(form) {
        getmenu(form).then((res) => {
          let list = res.data.data
          this.$store.commit('SET_MENU',res.data.data)
          let menusList  = []
          for (let i=0;i<list.length;i++) {
            menusList= menusList.concat(list[i].sonlist)
          }
          this.menusList=menusList
        })
      },
      checkMenus(val) {
        let data = {
          name: this.menus[val],
          id: val
        }
        this.$store.commit('CHANGE_SHOP', data)
        setTimeout(()=>{
          let form = new FormData()
          form.append('m', 16)
          console.log('das')
          this.getmenus(form)
        },30)

      },
      setDrawer() {
        this.$store.commit('SET_DRAWER')
      },
      tolist(code,title) {
        this.$router.push({
          path: '/list',
          query: {
            id: code,
            title:title
          }
        })
      },
      pullup() {

      },
      pulldown() {

      }
    },
    computed: {
      title() {
        return this.$store.state.pbCtrl.shop.name
      },
      shop() {
        return this.$store.state.pbCtrl.shop
      }
    },
    watch: {
      shop: {
        handler(val, old) {
          console.log(1111)
        },
        deep: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";

  .homes {

  }

  .itemsbox {
    text-align: center;

    p {
      font-size: 26px;
    }

    span {
      font-size: 16px;
    }
  }

</style>
