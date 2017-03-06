import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import test from './modules/test'
// import * as modules from './modules'
import createLogger from '../plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    test
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
