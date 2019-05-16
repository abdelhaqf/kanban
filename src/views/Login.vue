<template lang="html">
  <div class="login">
    <div class="container">
      <a id="title">Login</a>
      <input v-model="user.uname" ref="uname" @keydown.enter="$refs.pass.focus()" placeholder="username">
      <input v-model="user.pass" ref="pass" @keydown.enter="login" type="password" placeholder="password">
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
      // ds: dss('localhost:6020'),
      user: {
        uname: '',
        pass: '',
        department: []
      }
    }
  },
  methods: {
    login() {
      this.$parent.login(this.user.uname, this.user.pass)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.container {
  color: grey;
  font-size: 0.8em;
  display: flex;
  flex-direction: column;
  padding: 4px 6px;
  border: 1px solid grey;
  border-radius: 6px;
  position: relative;
}
div {

}
input {
  margin: 8px 0;
  padding: 4px 6px;
}
#title {
  position: absolute;
  top: -1em;
  padding: .35em;
  background-color: #F8FAFB;
}
</style>
