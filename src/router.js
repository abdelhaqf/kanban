import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {

        if(Vue.ls.get('login') === true)
          next()
        else
          next('/login')

      }
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {

        if(Vue.ls.get('login') === true)
          next(false)
        else
          next()

      }
    }

  ]
})
