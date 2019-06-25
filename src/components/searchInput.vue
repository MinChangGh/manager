<template>
    <div class="search-container">
        <search
            :placeholder="settingData.$placeholder"
            :cancel-text="settingData.$cancelText"
            v-model="settingData.$searchValue"
            :results="settingData.$searchResults"
            :auto-fixed="settingData.$autoFixed"
            :top="settingData.$fixedTop"
            :position="settingData.$position"
            :auto-scroll-to-top="settingData.$autoScrollToTop"
            @on-submit="onSubmit"
            @on-cancel="onCancel"
            @on-change="onChange"
            @on-result-click="resultClick"
            @on-focus="onFocus"
            @on-blur="onBlur"
            @on-clear="onClear"
            ref="search"
        ></search>
    </div>
</template>

<script>
import { Search } from "vux";
export default {
    data() {
        return {
            settingData: {
                $placeholder: this.placeholder,
                $cancelText: this.cancelText,
                $searchValue: this.searchValue,
                $searchResults: this.searchResults,
                $autoFixed: this.autoFixed,
                $fixedTop: this.fixedTop,
                $position: this.position,
                $autoScrollToTop: this.autoScrollToTop
            }
        };
    },
    components: {
        Search
    },
    methods: {
        onSubmit() {
            this.$emit("onSubmit", this.settingData.$searchValue);
        },
        onCancel() {
            this.$emit("onCancel", this.searchValue);
        },
        onChange(val) {
            this.$emit("onChange", val);
        },
        resultClick(item) {
            this.$emit("resultClick", item);
        },
        onFocus() {
            this.$emit("onFocus");
        },
        onBlur() {
            this.$emit("onBlur");
        },
        onClear() {
            this.$emit("onClear");
        }
    },
    props: {
        placeholder: {
            type: String,
            default: "有问题，点我搜搜看"
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        searchValue: {
            type: String,
            default: ""
        },
        searchResults: {
            type: Array,
            default: function() {
                return [];
            }
        },
        autoFixed: {
            type: Boolean,
            default: true
        },
        fixedTop: {
            type: String,
            default: "46px"
        },
        position: {
            type: String,
            default: "relative"
        },
        autoScrollToTop: {
            type: Boolean,
            default: false
        }
    },
    created: function() {},
    watch: {
        searchResults: function(newVal, oldVal) {
            this.settingData.$searchResults = newVal;
        }
    }
};
</script>
<style lang="scss" scoped>
.search-container {
    /deep/ .vux-search-box {
        height: 0.7rem !important;
        .weui-search-bar {
            height: 0.74rem !important;
            padding: 0rem 0.1rem;
            .weui-search-bar__form {
                line-height: 0.76rem;
                .weui-search-bar__input {
                    margin-bottom: 0;
                }
            }
            .weui-search-bar__cancel-btn {
                line-height: 0.74rem;
                font-size: 0.24rem;
            }
        }
    }
}
</style>
