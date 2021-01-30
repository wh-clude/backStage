import Vue from 'vue'
import Router from 'vue-router'
//引入仓库
import Store from '../store'
//封装一个函数看是否有权限
function hasUrl(url) {
  return Store.getters.getUserInfo.menus_url.some(item => item == url)
}
Vue.use(Router)

export const indexRouter = [
  {
    path: '/menu',
    component: () => import('@/views/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('@/views/role/role'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path: '/manager',
    component: () => import('@/views/manager/manager'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/manager') ? next() : next('/home')
    }
  },
  {
    path: '/classify',
    component: () => import('@/views/classify/classify'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/classify') ? next() : next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('@/views/specs/specs'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path: '/goods',
    component: () => import('@/views/goods/goods'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() : next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('@/views/banner/banner'),
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path: '/secKill',
    component: () => import('@/views/seckill/seckill'),
    name: '限时秒杀',
    beforeEnter: (to, from, next) => {
      hasUrl('/secKill') ? next() : next('/home')
    }
  },
  {
    path: '/vip',
    component: () => import('@/views/vip/vip'),
    name: '会员列表',
    beforeEnter: (to, from, next) => {
      hasUrl('/vip') ? next() : next('/home')
    }
  },
];

const router = new Router({
  routes: [
    {
      path: '/index',
      component: () => import('@/pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home'),
        },
        ...indexRouter,
        {
          path: '',
          redirect: '/home'
        },
      ]
    },
    {
      path: '/login',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
//全局导航守卫之登录拦截
router.beforeEach((to, from, next) => {
  //如果去登录页面就next
  if (to.path == '/login') {
    next();
    return
  }
  //如果有登录状态就next
  if (Store.getters.getUserInfo) {
    next();
    return
  }
  //都没有就强制跳转到登录页面
  next('/login')
})

export default router
