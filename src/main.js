// import 'shitajicss/docs/css/shitaji.min.css';
import './scss/style.scss';
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

//const Home = { template: "<Home v-if='!isLogin && !loading'></Home>" }
//const Editor = { template: "<Editor v-if='isLogin' :user='userData'></Editor>" }

const Home = { template: '<p>hoge</p>' }
const Editor = { template: '<p>fuga</p>' }

const routes = [
  {path: '/home', component: Hom},
  {path: '/editor', component: Editor}
]

const router = new VueRouter({routes: routes})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Vue.use(VueRouter);
