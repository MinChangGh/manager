<template>
  <div v-transfer-dom>
    <x-dialog v-model="dialogShow" class="dialog">
      <div class="img-box">
        <qrcode v-if="isPicture" :value="target" type="img" class="qrcode-style" :size="qrcodeSize"></qrcode>
        <div class="img-container">
          <img else :src="target">
        </div>
      </div>
      <div @click="dialogShow=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {XDialog, Qrcode, TransferDomDirective as TransferDom} from 'vux'

  export default {
    props: {
      target: {
        type: String,
        default: ""
      },
    },
    directives: {
      TransferDom
    },
    components: {
      Qrcode,
      XDialog
    },
    data() {
      return {
        dialogShow: false,
        qrcodeSize: 160,
        isPicture: true,
      };
    },
    created() {
      this.calQrcodeSize();
      this.resize();
      this.detectImage();
    },
    methods: {
      calQrcodeSize() {
        this.qrcodeSize = parseFloat((parseFloat(window.screen.width / 360).toFixed(2) * this.qrcodeSize).toFixed(2));
      },
      resize() {
        window.onresize = () => {
          this.qrcodeSize = 160;
          this.calQrcodeSize();
        }
      },
      detectImage() {
        this.isPicture = this.$$.isPicture(this.$props.target)
      }
    },
    watch: {
      target: function (newVal, oldVal) {
        if (newVal != oldVal) {
          this.dialogShow = true;
          this.detectImage();
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/styles/mixin.scss";

  .dialog {
    .img-box {
      @include flexLayout(wrap, row, space-around, center);
      height: 6rem;

      .qrcode-style {
        height: 100%;
        @include flexLayout(wrap, row, space-around, center);
      }
    }
  }

  .img-container {
    height: 100%;
    width: 100%;
    @include flexLayout(wrap, row, space-around, center);

    img {
      height: 68%;
      width: 68%;
    }
  }
</style>
