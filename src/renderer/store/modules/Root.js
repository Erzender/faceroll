import router from '../../router'

const login = require('facebook-chat-api')

/* login({email: 'erzender.contact@ntymail.com', password: ''}, (err, api) => {
  if (err) return console.error(err)
  api.listen((err, message) => {
    if (err) return console.error(err)
    api.sendMessage(message.body, message.threadID)
  })
}) */

const state = {
  isFetching: false,
  didInvalidate: false,
  loggedIn: false,
  facebookRes: '',
  api: null,
  appstate: null
}

const resetState = function (state) {
  state.isFetching = false
  state.didInvalidate = false
  state.loggedIn = false
  state.facebookRes = ''
  state.api = null
  state.appState = null
}

const mutations = {
  DISCONNECT (state) {
    resetState(state)
  },
  CONNECT_REQUEST (state) {
    state.isFetching = true
  },
  CONNECT_SUCCESS (state, api) {
    state.loggedIn = true
    state.isFetching = false
    state.didInvalidate = false
    state.api = api
    state.appState = JSON.stringify(api.getAppState())
    router.push('home')
  },
  CONNECT_FAIL (state, err) {
    state.isFetching = false
    state.didInvalidate = true
    state.facebookRes = err
  }
}

const actions = {
  facebookLogin ({ commit }, param) {
    commit('CONNECT_REQUEST')
    login({email: param.email, password: param.password}, (err, api) => {
      if (err) commit('CONNECT_FAIL', err.error)
      else commit('CONNECT_SUCCESS', api)
    })
  },
  facebookLogout ({ commit }) {
    commit('DISCONNECT')
  },
  facebookReload ({ commit }, param) {
    commit('CONNECT_REQUEST')
    login({appState: JSON.parse(param.appState)}, (err, api) => {
      if (err) commit('CONNECT_FAIL', err.error)
      else commit('CONNECT_SUCCESS', api)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
