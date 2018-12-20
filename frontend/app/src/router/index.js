import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Files from '@/components/Files'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/register',
      name: 'HelloWorld',
      component: Register
    },
    {
      path: '/login',
      name: 'HelloWorld',
      component: Login
    },
    {
      path: '/files',
      name: 'Files',
      component: Files,
      meta: {
        authRequired: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.authRequired) {
    const token = localStorage.getItem('token')
    if (!token) return next('/login')
  }

  next()
})

export default router
