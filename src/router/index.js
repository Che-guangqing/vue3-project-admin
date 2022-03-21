import { createRouter, createWebHistory } from 'vue-router'
import jwt_decode from 'jwt-decode'
import { ElMessage } from 'element-plus'

import Home from '../views/Home.vue'

import ItemList from '../views/ItemList.vue'

// import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'


import HeroesEdit from '../views/HeroesEdit.vue'
import HeroesList from '../views/HeroesList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserList from '../views/AdminUserList.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    // 除了登录页 其他页面需要登陆才能访问
    path: '/login',
    name: 'login',
    component: Login,
    meta:{isPublic:true}
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { name: 'Category' },
    children: [
      {
        path: '/items/list',
        component: ItemList
      },

      // {
      //   path: '/categories/create',
      //   component: CategoryEdit
      // },
      // {
      //   path: '/categories/edit/:id',
      //   component: CategoryEdit,
      //   props: true
      // },
      {
        path: '/categories/list',
        name: 'Category',
        component: CategoryList
      },


      {
        path: '/heroes/create',
        component: HeroesEdit
      },
      {
        path: '/heroes/edit/:id',
        component: HeroesEdit,
        props: true
      },
      {
        path: '/heroes/list',
        component: HeroesList
      },
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/ads/create',
        component: AdEdit
      },
      {
        path: '/ads/edit/:id',
        component: AdEdit,
        props: true
      },
      {
        path: '/ads/list',
        component: AdList
      },
      // {
      //   path: '/admin_users/create',
      //   component: AdminUserEdit
      // },
      // {
      //   path: '/admin_users/edit/:id',
      //   component: AdminUserEdit,
      //   props: true
      // },
      {
        path: '/admin_users/list',
        component: AdminUserList
      },
  ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 进入一个路前要做什么
  // to:去哪个路由
  // from:正在从哪个路由离开
  console.log(to.meta)
  const token = localStorage.getItem('token');
  if(!to.meta.isPublic){
      if(!token) {
        ElMessage({
          type: 'warning',
          message: '请重新登录'
        })
        return next('/login')
      } else {
        const { exp } = jwt_decode(token)
        const hasExpire = exp * 1000 < Date.now()
        if(hasExpire) {
            ElMessage({
              type: 'warning',
              message: '登录过期，请重新登录'
            })
            return next('/login');
        }
      }
  }
  if(!to.meta.isPublic && !localStorage.token) {
    // 如果不是公开访问的页面 并且没有token 则跳转至登陆页面
    // return next('/login')
  }
  next()
})

export default router
