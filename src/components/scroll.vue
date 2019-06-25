<template>
  <div ref="wrapper" class="wrapper" :style="position">
    <div class="content">
      <p v-if="topTip" class="top-tip">
        <span class="refresh-hook">{{pulldownMsg}}</span>
      </p>
      <slot></slot>
      <p class="bottom-tip">
        <span class="loading-hook">{{pullupMsg}}</span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      // 是否加载完成
      loadOver :{
        type:Boolean,
        default:false
      },
      // 头部条
      topTip:{
        type:Boolean,
        default:true
      },
      // 底部条
      BTip:{
        type:Boolean,
        default:true
      },
      position:{
        type: String,
        default:''
      },
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null,
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 1000
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tips: {
          downMsg: '下拉刷新',
          upMsg: '加载更多'
        }
      }
    },
    computed: {
      pulldownMsg() {
        return this.tips.downMsg;
      },
      pullupMsg() {
        return this.tips.upMsg;
      }
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 80)
    },
    methods: {
      setPullMsg () {

        this.tips.upMsg = '没有更多了'
      },
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }

        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX,

          pullUpRefresh: {
            threshold: 0,
            stop: 0
          },
          pullUpLoad: this.pullUpLoad
        });

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('pullingUp', () => {
            if (this.loadOver) {
              this.tips.upMsg = '没有更多了'
              return
            }
            this.tips.upMsg = "加载更多";
            setTimeout(() => {
              this.$emit('pullup');
              this.tips.upMsg = "加载中...";
              this.scroll.finishPullUp();
              this.scroll.refresh()
            }, 100)
          });
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('scroll', (pos) => {
            if (pos.y > 50) {
              //this.tips.downMsg = "释放刷新";
            }
          });
          this.scroll.on('pullingDown', () => {
            this.$emit('pulldown');
            this.tips.downMsg = "刷新完成";
            setTimeout(() => {
              this.tips.downMsg = "释放刷新";
              this.scroll.finishPullDown();
            }, 1000)
          });
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/styles/mixin.scss";

  .wrapper {
    width: 100%;
    overflow: hidden;
    position: absolute;
  }

  .top-tip {
    position: absolute;
    top: -0.4rem;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    color: #555;
    font-size: 0.15rem;
  }

  .bottom-tip {
    width: 100%;
    height: 0.35rem;
    line-height: 0.35rem;
    text-align: center;
    color: #555;
    position: absolute;
    bottom: -0.35rem;
    left: 0;
    font-size: 0.15rem;
  }
</style>
