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
        }

        else {
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

button:focus {outline:0;}

body {
  background-color: #F8FAFB;
}

</style>
