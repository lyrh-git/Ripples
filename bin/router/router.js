import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Introduction from '@/components/HomeContent/Introductions/Introduction'
import Realtime from '@/components/HomeContent/Posts/Realtime'
import Popular from '@/components/HomeContent/Posts/Popular'
import Topic1 from '@/components/HomeContent/Topics/Topic1'
import Topic2 from '@/components/HomeContent/Topics/topic2'
import Articles from '@/components/HomeContent/Recommendations/Articles'
import Games from '@/components/HomeContent/Recommendations/Games'
import Musics from '@/components/HomeContent/Recommendations/Musics'
import PopularGoods from '@/components/ShopContent/PopularGoods'
import Relief from '@/components/ShopContent/Relief'
import Outlet from '@/components/ShopContent/Outlet'
import Quiet from '@/components/ShopContent/Quiet'

import Goods from '@/components/Goods'
import Login from '@/components/Login'
import Register from '@/components/Register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'/',
          component:Introduction
        },
        {
          path:'/posts/realtime',
          component:Realtime
        },
        {
          path:'/posts/popular',
          component:Popular
        },
        {
          path:'/topics/topic1',
          component:Topic1
        },
        {
          path:'/topics/topic2',
          component:Topic2
        },
        {
          path:'/recommendations/articles',
          component:Articles
        },
        {
          path:'/recommendations/musics',
          component:Musics
        },
        {
          path:'/recommendations/games',
          component:Games
        },
      ]
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      children:[
        {
          path:'popularGoods',//这儿可自动续上，等价/shop/popularGoods
          component:PopularGoods
        },
        {
          path:'relief',
          component:Relief
        },
        {
          path:'outlet',
          component:Outlet
        },
        {
          path:'quiet',
          component:Quiet
        },
      ]
    },
    {
      path:'/goods',
      component:Goods
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
  ]
})
