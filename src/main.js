import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTimeago from 'vue-timeago'
import Storage from 'vue-ls'
import PrettyCheckbox from 'pretty-checkbox-vue'
import "vue-material-design-icons/styles.css"
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

var options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};
Vue.use(PrettyCheckbox);
Vue.use(Storage, options);
Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'ID', // Default locale
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
