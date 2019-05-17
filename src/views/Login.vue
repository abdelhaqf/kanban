<template lang="html">
  <div class="login" @keydown.esc="showSecret" tabindex="0">

    <div class="container">

      <a id="title"><b>Login</b></a>

      <input
        v-model="user.uname"
        ref="uname"
        @keydown.enter="$refs.pass.focus()"
        placeholder="username">

      <input
        v-model="user.pass"
        ref="pass"
        @keydown.enter="login"
        type="password"
        placeholder="password">

      <input
        v-if="secret"
        v-model="user.serverIP"
        ref="ip"
        @keydown.enter="login"
        placeholder="server IP">

      <a id="tips">Tekan <b>[ENTER]</b> untuk masuk</a>
    </div>

  </div>
</template>

<script>
import * as dss from 'deepstream.io-client-js'

export default {

  name: 'login',

  mounted() {
    this.$refs.uname.focus()
  },

  data: function() {
    return {
      secret: false,
      user: {
        uname: '',
        pass: '',
        serverIP: '',
        department: []
      }
    }
  },

  methods: {
    login() {
      this.$parent.login(this.user)
    },
    showSecret() {
      this.secret = true
    },
  },
  mounted() {
    var ip = this.$ls.get('ip')
    
    if(!ip)
      this.user.serverIP = '192.168.100.209'
    else
      this.user.serverIP = ip
  }

}
</script>

<style lang="scss" scoped>

.login {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
}

.container {
  color: grey;
  font-size: 0.8em;

  position: relative;
  display: flex;
  flex-direction: column;

  padding: 8px 12px;
  border: 1px solid grey;
  border-radius: 8px;
}

input {
  margin-top: 12px;
  padding: 4px 6px;
}

#title {
  position: absolute;
  top: -1em;

  color: #253858;
  background-color: #F8FAFB;
  padding: .35em;
}

#tips {
  color: grey;
  font-size: 0.7em;

  margin-top: 4px;
  margin-left: 4px;
}

</style>
