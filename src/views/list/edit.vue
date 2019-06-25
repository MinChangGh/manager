<template>
  <div class="edit">
    <XHeader
      :left-options="{showBack: true}"
      :title="title"
    >
    </XHeader>
    <div v-transfer-dom>
      <div style="font-size: 10px">
        <loading :show="showload" text="loading"></loading>
      </div>

    </div>
    <div class="wrapper" ref="wrapper">
      <div class="contentbox">

        <div v-for="(items,index) in list" class="items">
          <!--  纯文本    -->
          <div class="textbox" v-if="items.type =='text'">
            <p class="itemtitle">{{items.title}}</p>
            <input :disabled="disable" @keyup="changeText(index)" @change="changeText(index)" type="text"
                   v-model="items.val.text">
          </div>
          <!--  长文本    -->
          <div class="longtext" v-if="items.type =='longtext'">
            <p class="itemtitle">{{items.title}}</p>
            <textarea
              :disabled="disable"
              v-model="items.val.text"
              @keyup="changeText(index)"
            >
          </textarea>
          </div>
          <!--  图片    -->
          <div class="pic" v-if="items.type =='pic'">
            <p class="itemtitle">{{items.title}}</p>
            <div class="imgbox">
              <img :src="items.val.img">
              <van-uploader
                :disabled="disable"
                @click.native="setindex(index)"
                class="uploader"
                :after-read="afterRead"
              >
                <div class="upinner">
                  上传图片
                </div>

              </van-uploader>
            </div>
          </div>


          <!--  单选    -->
          <!--          <div class="radio" v-if="items.type =='radio'">-->
          <!--            <p>{{items.title}}</p>-->
          <!--            <group>-->
          <!--              <Radio  @on-change="radioChange(arguments,index)" :options="items.val.range" v-model="items.val.checkVal[0]"></Radio>-->
          <!--            </group>-->
          <!--          </div>-->
          <!--  单选   -->
          <div class="checkbox" v-if="items.type =='radio'">
            <p class="itemtitle">{{items.title}}</p>
            <group>
              <selector
                :readonly="disable"
                v-model="items.val.radioVal[0]"
                :title="items.title"
                name="district"
                :options="items.val.range"
                @on-change="onChange(index)">
              </selector>
            </group>
          </div>

          <!-- 日期-->
          <div class="datebox" v-if="items.type == 'date'">
            <p class="itemtitle">{{items.title}}</p>
            <group>
              <datetime
                :readonly="disable"
                v-model="items.val.date"
                format="YYYY-MM-DD HH:mm"
                :minute-list="['00', '15', '30', '45']"
                @on-change="datechange(arguments,index)"
                title="请选择日期">
              </datetime>

            </group>
          </div>

          <!-- 地址  -->
          <div v-if="items.type =='address'" class="address">
            <p class="itemtitle">{{items.title}}</p>
            <group>
              <x-address
                :disabled="disable"
                @on-hide="logHide"
                @on-show="logShow"
                title="请选择地址"
                v-model='items.val.address'
                :list="addressData"
                @on-shadow-change="onShadowChange"
                placeholder="请选择地址"
                :show.sync="showAddress">
              </x-address>
            </group>
          </div>

          <!--   多选       -->
          <div v-if="items.type == 'checker'" class="checkerMore">
            <p class="itemtitle">{{items.title}}</p>
            <checker
              class="checkbox"
              @on-change="checkerMore"
              type="checkbox"
              v-model="items.val.checkerVal"
              default-item-class="checkitem"
              selected-item-class="item-selected">
              <checker-item :disabled="disable" class="ci" :key="index" v-for="(ci,index) in items.val.range"
                            :value="index">{{ci}}
              </checker-item>

            </checker>
          </div>

        </div>
        <div class="save" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  import scroll from '@/components/scroll'
  import {
    Radio, Group, XTextarea, XHeader,
    Actionsheet, TransferDom, Selector,
    Datetime, ChinaAddressV4Data, XAddress,
    Loading, Checklist, Checker, CheckerItem
  } from 'vux'

  export default {
    name: "edit",
    directives: {
      TransferDom
    },
    data() {
      return {
        Checkbox: ['2'],
        checklist: ['ds', '45'],
        showload: false,
        value2: ['430000', '430400', '430407'],
        showAddress: false,
        addressData: ChinaAddressV4Data,
        list: [],
        title: '',
        num: 1,
        index: Number,
        disable: false,
        type: '',
        chekerval: [2]
      }
    },
    created() {
      // this.showload=true
      this.setTitle()
      setTimeout(() => {
        this.initScroll()
      }, 30)

      setTimeout(() => {
          let num = Math.floor(Math.random()*2)
          console.log(num)
          this.showload = false
          if (this.type == 'add') {
            let list1 = [
              {
                title: '姓名',
                val: {
                  text: ''
                },
                type: 'text'
              },
              {
                title: '描述',
                val: {
                  text: '',
                  img: ''
                },
                type: "longtext"
              },
              {
                title: '图片',
                val: {
                  text: '',
                  img: ''
                },
                type: "pic"
              },
              {
                title: '性别',
                val: {
                  text: '',
                  img: '',
                  radioVal: ['男'],
                  range: ['男', '女']
                },
                type: 'radio'
              },
              {
                title: '日期',
                val: {
                  text: 123,
                  img: '',
                  radioVal: ['青岛'],
                  date: ''
                },
                type: "date"
              },
              {
                title: '地址',
                val: {
                  text: '',
                  img: '',
                  radioVal: ['烟台'],
                  date: '2017-06-12 09:00',
                  address: []
                },
                type: "address"
              },
              {
                title: '门店选择',
                val: {
                  text: '',
                  img: '',
                  radioVal: ['烟台'],
                  checkerVal: [],
                  date: '2017-06-12 09:00',
                  range: ['汉高一店', '汉高二店', '汉高三店', '汉高四店', '汉高无店'],
                  address: ['430000', '430400', '430407']
                },
                type: "checker"
              }
            ]
            let list2 = [
              {
              title: '标题',
              val: {
                text: ''
              },
              type: 'text'
            },
              {
                title: '描述',
                val: {
                  text: 'sfsdfsd',
                  img: ''
                },
                type: "longtext"
              }]
            if (num ==0) {
              this.list = list1
            } else{
              this.list = list2
            }

          } else if (this.type == 'edit' || this.type == 'detail') {
            let list1 = [
              {
                title: '姓名',
                val: {
                  text: '黄飞鸿'
                },
                type: 'text'
              },
              {
                title: '描述',
                val: {
                  text: '优惠活动优惠活动优惠活动',
                  img: 'http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg'
                },
                type: "longtext"
              },
              {
                title: '图片',
                val: {
                  text: '优惠活动优惠活动优惠活动',
                  img: 'http://img5.imgtn.bdimg.com/it/u=3300305952,1328708913&fm=26&gp=0.jpg'
                },
                type: "pic"
              },
              {
                title: '性别',
                val: {
                  text: 123,
                  img: '',
                  radioVal: ['男'],
                  range: ['男', '女']
                },
                type: "radio"
              },

              {
                title: '日期',
                val: {
                  text: 123,
                  img: '',
                  radioVal: ['烟台'],
                  date: '2017-06-12 09:00'
                },
                type: "date"
              },
              {
                title: '地址',
                val: {
                  text: '',
                  img: '',
                  radioVal: ['烟台'],
                  date: '2017-06-12 09:00',
                  address: ['430000', '430400', '430407']
                },
                type: "address"
              },
              {
                title: '门店选择',
                val: {
                  text: '',
                  img: '',
                  radioVal: ['烟台'],
                  checkerVal: [1],
                  date: '2017-06-12 09:00',
                  range: ['汉高一店', '汉高二店', '汉高三店', '汉高四店', '汉高无店'],
                  address: ['430000', '430400', '430407']
                },
                type: "checker"
              }
            ]
            let list2 = [
              {
                title: '标题',
                val: {
                  text: ''
                },
                type: 'text'
              },
              {
                title: '描述',
                val: {
                  text: 'sfsdfsd',
                  img: ''
                },
                type: "longtext"
              }]
            if (num ==0) {
              this.list = list1
            } else{
              this.list = list2
            }
          }

        },100)
    },
    methods: {
      checkerMore() {

      },
      onShadowChange() {

      },
      logHide() {
      },
      logShow() {
      },
      datechange(val) {

      },
      initScroll() {
        this.scrolls = new Bscroll(this.$refs.wrapper, {
          click: true,
          bounce: false
        })
      },
      setTitle() {
        let query = this.$route.query
        this.type = query.type
        if (query.type == 'add') {
          this.title = '新增'
        } else if (query.type == 'edit') {
          this.title = '编辑'
        } else if (query.type == 'detail') {
          this.title = '详情'
          this.disable = true
        }
      },
      changeText(index) {

        //this.list[index]
      },
      radioChange(arg, index) {
        let val = arg[0]
        this.list[index].val.checkVal[0] = val

      },
      afterRead(file) {
        this.list[this.index].val.img = file.content
        setTimeout(() => {
          this.scrolls.refresh()
        }, 1000)
      },
      setindex(index) {
        this.index = index
      },
      onChange(arg, index) {
        // let val = arg[0]
        // this.list[index].val.checkVal[0] = val

      },
      save() {
        let list = this.list
        for (let i = 0; i < list.length; i++) {
          if (list[i].type == 'text') {
            if (list[i].val.text == '') {
              this.$$.msgInf(`${list[i].title}未填写`)
              return
            }
          }
          if (list[i].type == 'longtext') {
            if (list[i].val.text == '') {
              this.$$.msgInf(`${list[i].title}未填写`)
              return
            }
          }
          if (list[i].type == 'pic') {
            if (list[i].val.img == '') {
              this.$$.msgInf(`${list[i].title}未添加`)
              return
            }
          }
          if (list[i].type == 'date') {
            if (list[i].val.date == '') {
              this.$$.msgInf(`${list[i].title}未填写`)
              return
            }
          }

          if (list[i].type == 'address') {

            if (list[i].val.address.length == 0) {
              this.$$.msgInf(`${list[i].title}未填写`)
              return
            }
          }

        }

        this.$router.go(-1)
      }
    },
    components: {
      Radio,
      Group,
      XTextarea,
      XHeader,
      Actionsheet,
      Selector,
      scroll,
      Datetime,
      XAddress,
      Loading,
      Checklist,
      Checker,
      CheckerItem
    }
  }
</script>

<style scoped lang="scss">
  @import "@/styles/mixin.scss";

  .item-selected {
    border: 1px solid green !important;
  }

  .checkitem {
    border: 1px solid #ccc;
    padding: 5px 15px;
  }

  .edit {
    width: 100%;
    height: 100%;
    background: #fafafa;
    overflow: scroll;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    .wrapper {
      position: absolute;
      width: 100%;
      top: 46px;
      bottom: 0;
      overflow: hidden;

      .contentbox {
        padding-bottom: 2rem;

        .items {
          p {
            width: 100%;
            padding: 0 0.2rem;
            text-align: left;
            line-height: 0.7rem;
            position: relative;
            @include onepx(0px, 0px)
          }

          .textbox {
            width: 100%;

            input {
              line-height: 0.7rem;
              position: relative;
              @include onepx(0px, 0px);
              width: 100%;
              padding-left: 0.2rem;
            }
          }

          .longtext {
            textarea {
              width: 100%;
              border: none;
              min-height: 2rem;
              outline: none;
              padding-left: 0.2rem;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
          }

          .pic {
            .imgbox {
              margin-top: 0.2rem;
              padding-left: 0.2rem;

              .uploader {
                width: 100%;
                height: 0.7rem;
                position: relative;
                margin-top: 0.2rem;

                .upinner {
                  line-height: 0.8rem;
                  width: 6rem;
                  left: 50%;
                  margin-left: -3rem;
                  border-radius: 0.1rem;
                  text-align: center;
                  position: absolute;
                  font-size: 0.4rem;
                  color: #ffffff;
                  background: #007aff;
                }
              }

              img {
                width: 96%;
                height: auto;
                border-radius: 2%;
                margin: auto;
              }
            }
          }

          .checkbox {
            margin-top: 0.2rem;
          }

          .checkerMore {
            .checkbox {
              padding: 0.1rem 0.2rem;
              background: #ffffff;
            }

            .ci {
              margin-right: 0.2rem;
              margin-bottom: 0.2rem;
            }
          }
        }

        .save {
          margin: 2rem auto 0rem auto;
          width: 6rem;
          line-height: 0.8rem;
          text-align: center;
          font-size: 0.4rem;
          background: #007aff;
          color: #ffffff;
          border-radius: 0.1rem;
        }
      }
    }


  }
</style>
