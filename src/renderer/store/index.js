import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persistfile'
import modules from './modules'

const electron = require('electron')

Vue.use(Vuex)

const persist = new VuexPersist({
  path: (electron.app || electron.remote.app).getPath('userData'),
  reducer: (state) => {
    return {
      Root: state.Root
    }
  }
})

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [persist.subscribe()]
})
