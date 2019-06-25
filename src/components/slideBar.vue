<template>
  <div class="slidebox">
    <div @click="setDrawer" ref="slidemask" v-if="showSlide" class="slidemask"></div>
    <div class="slidebar" ref="slidebar">
          <span slot="overwrite-left" @click="setDrawer" class="iconbox">
            <x-icon class="icon" type="navicon" size="35"></x-icon>
          </span>
      <ul class="list" v-for="(item,index) in list">
        <div @click="spread(index)" class="f-title">{{item.name}}</div>
        <div class="unactive" :class="{'active':(index ==activeIndex)}">
          <li class="s-title" @click="tolist(sonlist.id,sonlist.name)" v-for="(sonlist,index) in item.sonlist">
            {{sonlist.name}}
          </li>
        </div>
      </ul>

    </div>
  </div>

</template>

<script>
  export default {
    name: "slideBar",
    data() {
      return {
        list2: [
          {name: '账号安全', id: 1},
          {name: '个人信息', id: 1},
          {name: '联系方式', id: 1},
          {name: '收货地址', id: 1},
          {name: '日期设置', id: 1},
          {name: '活动时间', id: 1},
          {name: '推送设置', id: 1},
          {name: '消息推送', id: 1},
          {name: '微信登录', id: 1},
        ],
        showModeValue: 'overlay',
        showPlacement: 'left',
        showPlacementValue: 'left',
        title: '首页',
        activeIndex: Number
      }
    },
    created() {

    },
    methods: {
      setDrawer() {
        this.$store.commit('SET_DRAWER')
      },
      spread(index) {
        if (index == this.activeIndex) {
          this.activeIndex = -1
          return
        }
        this.activeIndex = index
      },
      tolist(id, title) {
        this.setDrawer()
        this.$router.push({
          path: '/list',
          query: {
            id: id,
            title: title
          }
        })
      },
      onClickMore() {
        this.showMenus = true
      }
    },
    computed: {
      list() {
        return this.$store.state.pbCtrl.menuList
      },
      showSlide() {
        return this.$store.state.pbCtrl.drawerVisibility
      }
    },
    watch: {
      showSlide(val) {
        if (val) {
          this.$refs.slidebar.style.left = '0px'
        } else {
          this.$refs.slidebar.style.left = '-150px'
        }
      }
    }
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

  .slidebox {
    .slidemask {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      background: #000;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
      bottom: 0;
    }

    .slidebar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -150px;
      transition: 0.2s;
      width: 150px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 16px;
      color: #ffffff;
      background: #35495e;
      z-index: 1000;

      .iconbox {
        display: flex;
        height: 46px;
        align-items: center;

        .icon {
          z-index: 2000;
          fill: #fff;
          position: relative;
          left: 10px;
        }
      }

      .list {
        .f-title {
          line-height: 0.6rem;
          font-size: 0.34rem;
          padding-left: 0.2rem;
        }

        .s-title {
          padding-left: 0.2rem;
          line-height: 0.6rem;
          font-size: 0.3rem;
          background: #ffffff;
          color: #333;
          position: relative;
          @include onepx();
        }
      }
    }
  }


</style>
