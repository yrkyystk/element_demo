import Vue from 'vue'
import VueRouter from 'vue-router'
const BookManage = ()=> import ('../views/BookManage');
const AddBook = ()=> import ( "../views/AddBook");
const pageThree = ()=> import ( "../views/PageThree");
const pageFour = ()=> import ( "../views/PageFour");
const index = ()=> import('../views/Index');
const book = ()=> import('../views/Book');

Vue.use(VueRouter)
// routes 其实是一个类似json形式的变量
const routes = [
  {
    path: '/', name: '图书管理', component: index, redirect:'/BookManage',
    children: [{path: '/BookManage', name: 'BookManage', component: BookManage}, {path: '/AddBook', name: 'AddBook', component: AddBook},
    {path:'/books',name:'前端假数据',component:book}]
  },
  {
    path: '/navigation', name: '导航二', component: index,
    children: [{path: '/PageThree', name: 'PageThree', component: pageThree}, {
      path: '/PageFour',
      name: 'PageFour',
      component: pageFour
    }]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
