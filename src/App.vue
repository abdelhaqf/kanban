<template lang="html">
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
import * as dss from 'deepstream.io-client-js'

export default {
  data: function() {
    return {
      ds: ''
    }
  },
  methods: {
    login(username, password) {
      this.ds = dss('192.168.100.209:6020')
      this.ds.login({username: username, password: password},(success, data)=>{
        if(success === true) {
          console.log('login!');
          var user = {
            uname: username,
            pass: password,
            department: data.department
          }
          this.$ls.set('user', user, 60 * 60 * 1000)
          this.$ls.set('login', true, 60 * 60 * 1000)
          this.$router.push('/')
        } else {
          console.log('gagal login!');
          this.$ls.clear()
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~pretty-checkbox/src/pretty-checkbox.scss';
html, body, * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial;
}
body {
  background-color: #F8FAFB;
}
</style>

<!-- <template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style> -->
