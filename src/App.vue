<template lang="html">

  <div class="app">
    <router-view/>
  </div>

</template>

<script>

  import * as dss from 'deepstream.io-client-js'
  export default {
    data: function() {
      return { ds: '' }
    },
    methods: {
      login(user) {
        console.log()
        this.ds = dss(user.serverIP + ':6020')
        this.ds.login({ username: user.uname, password: user.pass }, (success, data) => {
          if (success === true) {
            console.log('login!')
            var myUser = {
              uname: user.uname,
              pass: user.pass,
              serverIP: user.serverIP,
              department: data.department
            }
            this.$ls.set('user', myUser, 60 * 60 * 1000)
            this.$ls.set('login', true, 60 * 60 * 1000)
            this.$ls.set('ip', user.serverIP)
            this.$router.push('/')
          } else {
            console.log('gagal login!')
            this.$ls.clear()
          }
        })
      }
    }
  }

</script>
<style lang="scss">

  @import '~pretty-checkbox/src/pretty-checkbox.scss';
  html,
  body,
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial;
  }
  button:focus {
    outline: 0;
  }
  body {
    background-color: #f8fafb;
  }

</style>
