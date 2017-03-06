import * as types from '../mutation-types'

// initial state
const state = {
  status: null
}

// getters
const getters = {
  status: state => state.status
}

// actions
const actions = {
  getArr ({ commit }) {
    // shop.getArr(datas => {
    //   commit(types.SET_ARR, { datas })
    // })
  }
}

// mutations
const mutations = {
  [types.SET_STATUS] (state, status) {
    state.status = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
