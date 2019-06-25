import {getCno, setCno} from '@/utils/common'
import {getComNo} from '@/api/common'

const common = {
  state: {
    cno: getCno(),
  },

  mutations: {
    SET_TOKEN: (state, cno) => {
      state.cno = cno
    },
  },

  actions: {
    SetCno({commit}) {
      return new Promise((resolve, reject) => {
        getComNo().then(response => {
          if (response.code === 1) {
            reject('error')
          }
          const data = response.data
          commit('SET_TOKEN', data.cno)
          setCno(data.cno)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default common
