import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/store/modules/cache'
import errorLog from '@/store/modules/errorLog'
import common from '@/store/modules/common'
import pbCtrl from '@/store/modules/ctrl'
import getters from '@/store/getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cache,
    errorLog,
    common,
    pbCtrl
  },
  getters
})

export default store
