import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index/Home.vue'
import Parser from '@/components/parser/example/Index.vue'
import tinymce from '@/components/tinymce/index'
import demo from '@/views/demo/demo.vue'
import demo2 from '@/views/demo/demo2.vue'
import axiosVue from '@/views/demo/axiosDemo.vue'
import Axios from 'axios'


Vue.use(VueRouter)
Vue.prototype.$axios = Axios

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/parser',
    name: 'parser',
    component: Parser
  },
  {
    path: '/tinymce',
    name: 'tinymce',
    component: tinymce
  },
  {
    path: '/demo',
    name: 'demo',
    component: demo
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: demo2
  },
  {
    path: '/axios',
    name: 'axiosVue',
    component: axiosVue
  }
]

const router = new VueRouter({
  routes
})

export default router
