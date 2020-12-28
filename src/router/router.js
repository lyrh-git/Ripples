import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Introduction from '@/components/HomeContent/Introductions/Introduction'
import Realtime from '@/components/HomeContent/Posts/Realtime'
import Popular from '@/components/HomeContent/Posts/Popular'
import RealtimeTopic from '@/components/HomeContent/Topics/RealtimeTopic'
import PopularTopic from '@/components/HomeContent/Topics/PopularTopic'
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
import Personal from '@/components/Personal'
import Person from '@/components/Person'

import PersonalData from '@/components/PersonContent/PersonalData'
import Collect from '@/components/PersonContent/Collect'
import Comment from '@/components/PersonContent/Comment'
import Graph from '@/components/PersonContent/Graph'
import Interest from '@/components/PersonContent/Interest'
import InterestOne from '@/components/PersonContent/InterestOne'
import Post from '@/components/PersonContent/Post'
import Recommendation from '@/components/PersonContent/Recommendation'
import Test from '@/components/PersonContent/Test'
import Cloud from '@/components/PersonContent/Cloud'
import PostEditor from '@/components/PersonContent/PostEditor'

import WholePost from '@/components/WholePost'
import WholeTopic from '@/components/WholeTopic'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Home',
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
          path:'/topics/realtime',
          component:RealtimeTopic,
          name:'RealtimeTopic',
        },
        {
          path:'/topics/popular',
          component:PopularTopic,
          name:'PopularTopic'
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
    },
    {
      path:'/personal',
      component:Personal
    },
    {
      path:'/person',
      component:Person,
      children:[
        {
          path:'/',
          component:PersonalData
        },
        {
          path:'/person/data',
          component:PersonalData
        },
        {
          path:'/person/graph',
          component:Graph
        },
        {
          path:'/person/collect',
          component:Collect
        },
        {
          path:'/person/comment',
          component:Comment
        },
        {
          path:'/person/interest',
          component:Interest
        },
        {
          path:'/person/interestone',
          component:InterestOne
        },
        {
          path:'/person/post',
          component:Post
        },
        {
          path:'/person/recommendation',
          component:Recommendation
        },
        {
          path:'/person/test',
          component:Test
        },
        {
          path:'/person/cloud',
          component:Cloud
        },
        {
          path:'/person/post_editor',
          component:PostEditor
        }
      ]
    },
    {
      path:'/post',
      // 一定要写name,params必须用name来识别路径
      name:'WholePost',
      component:WholePost,
    },
    {
      path:'/topic',
      // 一定要写name,params必须用name来识别路径
      name:'WholeTopic',
      component:WholeTopic,
    },
  ]
})
