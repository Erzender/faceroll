<template>
  <div>
    <div v-if="!loggedIn && !loading">
      facebook account email
      <input v-model="email"></input>
      password
      <input type='password' v-model="password"></input>
      <button v-on:click='loginButton(email, password)'>Log in</button>
      facebook server : {{message}}
    </div>
    <div v-if="loggedIn && !loading">
      <button v-on:click='logoutButton()'>Log out</button>
      <button v-on:click='accessButton(appState)'>Go to session</button>
    </div>
    <div v-if="loading">
      loading...
      <button v-on:click='logoutButton()'>Abort</button>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data () {
      return {
        email: [],
        password: []
      }
    },
    computed: {
      loggedIn () { return this.$store.state.Root.loggedIn },
      message () { return this.$store.state.Root.facebookRes },
      loading () { return this.$store.state.Root.isFetching },
      appState () { return this.$store.state.Root.appState }
    },
    methods: {
      loginButton (email, password) { this.$store.dispatch('facebookLogin', {email, password}) },
      logoutButton () { this.$store.dispatch('facebookLogout') },
      accessButton (appState) { this.$store.dispatch('facebookReload', {appState}) },
      ...mapMutations({
      })
    }
  }
</script>

<style>
</style>
