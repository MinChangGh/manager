<template>
  <div class="alllist">
    <!--    头部组件-->
    <XHeader
      :right-options="{showMore: true}"
      :title="title"
      @on-click-more="showMenus = true">
          <span slot="overwrite-left" @click="setDrawer">
            <x-icon type="navicon" size="35"
                    style=" z-index:50000 !important;fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
    </XHeader>
    <!--   中间弹出框dialog -->
    <x-dialog v-model="showToast" :hide-on-blur="true">
      <div class="Mdialog">中间弹出</div>
    </x-dialog>

    <!--    confirm 弹窗-->
    <div v-transfer-dom>
      <confirm
        title="确定删除吗？"
        v-model="show"
        @on-cancel="onCancel"
        @on-confirm="onConfirm">
      </confirm>
    </div>
    <!--    搜索-->
    <searchinput @onSubmit="search"></searchinput>
    <!--  底部弹出选项  -->
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="checkMenus"></actionsheet>
    </div>

    <!--    主界面-->
    <scroll ref="scroll" :loadOver="loadOver" :pullUpLoad="dopullup" :topTip="false" :pulldown="false" :pullup="true"
            @pullup="pullup" :position="style">
      <div class="listbox" v-for="(item,index) in list">
        <div @click="todetail(index)" class="listitem" v-for="key in keys">
          <span>{{key[0]}}</span>
          <span>{{item[key[1]]}}</span>
        </div>

        <!--        <div @click="todetail(index)" class="listitem2">-->
        <!--          <div class="left" >-->
        <!--            <p v-for="key in key2">{{key}}</p>-->
        <!--          </div>-->
        <!--          <div class="right">-->
        <!--            <p v-for="(val,key,index) in item">{{val}} </p>-->

        <!--          </div>-->
        <!--        </div>-->

        <div class="btnbox">
          <div @click="del(index)" v-for="ops in item.operator" v-if="ops.type=='del'">删除</div>
          <div @click="other(index)" v-for="ops in item.operator" v-if="ops.type=='other'">其它操作</div>
          <div @click="toedit(index)" v-for="ops in item.operator" v-if="ops.type=='edit'">编辑</div>
          <!--          <div @click="del(index)" class="left"> 删除 </div>-->
          <!--          <div @click="toedit(index)" class="right"> 修改 </div>-->
        </div>
      </div>
    </scroll>

  </div>
</template>

<script>
  import {XHeader, Actionsheet, TransferDom, Confirm, XDialog} from 'vux'
  import scroll from '@/components/scroll'
  import searchinput from '@/components/searchInput'
  import {getlist, getkey} from '@/api/api'

  export default {
    name: "detail",
    data() {
      return {
        id:'',
        title:'',
        showToast: false,
        show: false,
        loadOver: false,
        dopullup: true,
        pn: 0,
        style: 'top:86px;bottom:0',
        title: "列表",
        list: [],
        key2: [],
        keys: [
          {
            0: '姓名',
            1: 'name'
          },
          {
            0: '标题',
            1: 'title'
          },
          {
            0: '日期',
            1: 'date'
          },
          {
            0: '地址',
            1: 'address'
          }
        ],
        menus: {
          menu1: '新增',
        },
        showMenus: false
      }
    },
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      scroll,
      searchinput,
      Confirm,
      XDialog
    },
    created() {
      this.id = this.$route.query.id
      this.title = this.$route.query.title


      let list1 = [
        {
          name: 'linda',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'del'
            },
            {
              type: 'edit'
            }

          ]
        },
        {
          name: 'linda2',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'del'
            },
            {
              type: 'other'
            },
          ]
        },
        {
          name: 'linda3',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'del'
            },
            {
              type: 'edit'
            },
            {
              type: 'other'
            },
          ]
        },
        {
          name: 'linda4',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'del'
            },
            {
              type: 'edit'
            },
            {
              type: 'other'
            },
          ]
        },
        {
          name: 'linda5',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'del'
            },
            {
              type: 'edit'
            },
            {
              type: 'other'
            },
          ]
        },
        {
          name: 'linda6',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'del'
            },
            {
              type: 'edit'
            },
            {
              type: 'other'
            },
          ]
        },
        {
          name: 'linda7',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'other'
            }
          ]
        },
        {
          name: 'linda10',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'del'
            }
          ]
        },
        {
          name: 'linda9',
          title: '456',
          date: '2018-5=6',
          address: '标题',
          operator: [
            {
              type: 'edit'
            },
            {
              type: 'other'
            },
          ]
        }
      ]
      let list2 = [
        {
          title: '取件通知',
          job1: '软件',
          job2: '硬件',
          job3: '服务',
          job4: '搬砖',
        },
        {
          title: '取件通知',
          job1: '软件',
          job2: '硬件',
          job3: '服务',
          job4: '搬砖',
        },
        {
          title: '取件通知',
          job1: '软件',
          job2: '硬件',
          job3: '服务',
          job4: '搬砖',
        },
        {
          title: '取件通知',
          job1: '软件',
          job2: '硬件',
          job3: '服务',
          job4: '搬砖',
        }

      ]
      let key11 = ['姓名', '标题', '日期', '地址']
      let key22 = ['标题', '一级行业', '二级行业', '三级行业', '四级行业']
      //let num = Math.ceil(Math.random()*2)
      // let num = 1
      // if (num == 1) {
      //   this.list = list1
      //   this.key2 = key11
      // } else {
      //   this.list = list2
      //   this.key2 = key22
      // }
      this.getkey()
      this.getList()

    },
    methods: {
      getkey() {
        let data = {
          a: this.id
        }
        getkey().then((res) => {
          this.keys = res.data.data[this.id-1]
        })
      },
      getList(from) {
        let data = {
          a: this.id
        }
        getlist().then((res) => {
          if (from == 'search') {
            this.pn == 1
          }
          if (this.pn == 1) {

            this.list = res.data.data[this.id-1]
          } else {

            this.list = this.list.concat(res.data.data[this.id-1])
          }

        })
      },
      setDrawer() {
        this.$store.commit('SET_DRAWER', true)
      },
      other() {
        this.showToast = true
      },

      onCancel() {

      },
      onConfirm() {

      },
      search(val) {
        if (val == '') {
          this.$$.msgInf('请输入搜索内容')
          this.getList()
          return
        }
        this.list=[]
        this.getList('search')
      },
      pullup() {
        this.pn++
        if (this.pn > 5) {
          this.loadOver = true
          // this.dopullup = false
          this.$refs.scroll.setPullMsg()
          //this.$refs.scroll.
          // this.list.concat([])
          return
        }
        this.getList()
        // let arr = [
        //   {
        //     name: '1',
        //     title: '456',
        //     date: '2019-5',
        //     address: '新增',
        //     operator: []
        //   },
        //   {
        //     name: '2',
        //     title: '456',
        //     date: '2019-5',
        //     address: '新增',
        //     operator: []
        //   },
        //   {
        //     name: '3',
        //     title: '456',
        //     date: '2019-5',
        //     address: '新增',
        //     operator: []
        //   },
        //   {
        //     name: '4',
        //     title: '456',
        //     date: '2019-5',
        //     address: '新增',
        //     operator: []
        //   }
        // ]
        // this.list = this.list.concat(arr)

      },
      del(index) {
        //this.show = true
        this.list.splice(index, 1)
      },
      checkMenus() {
        this.$router.push({
          path: '/edit',
          query: {
            type: 'add',
            index: null
          }
        })
      },
      todetail(index) {
        this.$router.push({
          path: '/edit',
          query: {
            type: 'detail',
            index: index
          }
        })
      },
      toedit(index) {
        this.$router.push({
          path: '/edit',
          query: {
            type: 'edit',
            index: index
          }
        })
      },
    },
    watch: {
      // 利用watch方法检测路由变化：
      '$route': {
        handler(to, from) {
          this.pn =1
          this.list = []
          this.keys = []
          this.id=this.$route.query.id
          this.title = this.$route.query.title
          setTimeout(()=>{
            this.getkey()
            this.getList()
          },100)
        },
        deep: true

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";

  .Mdialog {
    height: 6rem;
  }

  .alllist {
    background: #ffffff;
    width: 100%;
    height: 100% !important;

    .listbox {
      background: #fafafa;
      margin-bottom: 0.5rem;
      padding-top: 0.2rem;

      .listitem {
        padding: 0 0.2rem;
        display: flex;
        justify-content: space-between;
        line-height: 0.6rem;
        color: #666;
        font-size: 0.3rem;
      }

      .listitem2 {
        display: flex;
        padding: 0 0.2rem;
        justify-content: space-between;
        line-height: 0.6rem;
        color: #666;
        font-size: 0.3rem;
      }

      .btnbox {
        position: relative;
        line-height: 0.8rem;
        @include onepxtop(0px, 0px);
        display: flex;
        color: #666;

        div {
          flex: 1;
          text-align: center;
          border-right: 1px solid #c8c7cc;
        }

        div:last-child {
          border: none;
        }

        .left {
          border-right: 1px solid #c8c7cc;
        }
      }
    }
  }
</style>
