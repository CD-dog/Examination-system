import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Personal from '../views/Personal.vue'
import Change from '../views/Change.vue'
import Homepage from '../views/Homepage.vue'
import Centre from '../views/Centre.vue'
import Questions from '../views/Questions.vue'
import Begin from '../views/Begin.vue'
import Accouns from '../views/Accouns.vue'
import Wrong from '../views/Wrong.vue'
import WrongTopic from '../views/WrongTopic.vue'
import Rank from '../views/Rank.vue'
import Result from '../views/Result.vue'
import Achievement from '../views/Achievement.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,

  },
  {
    path: '/Register',
    name: 'register',
    component: Register
  },
  {
    path: '/Personal',
    name: 'personal',
    component: Personal,
    meta: {
      showTab: true
    }
  },
  {
    path: '/change',
    name: 'change',
    component: Change
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: Homepage,
    meta: {
      showTab: true
    }
  }, {
    path: '/centre',
    name: 'Centre',
    component: Centre
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/begin',
    name: 'Begin',
    component: Begin
  },

  {
    path: '/accouns',
    name: 'Accouns',
    component: Accouns
  },
  {
    path: '/wrong',
    name: 'Wrong',
    component: Wrong,
    meta: {
      showTab: true
    }
  },
  {
    path: '/WrongTopic',
    name: 'WrongTopic',
    component: WrongTopic,

  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    meta: {
      showTab: true
    }

  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
    meta: {
      showTab: true
    }

  },
  {
    path: '/achievement',
    name: 'achievement',
    component: Achievement
  },
]

const router = new VueRouter({
  //h5的模式
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router