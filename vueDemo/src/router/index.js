import Vue from 'vue'
import Router from 'vue-router'

import About from '../view/About.vue'
import Story from '../view/Story.vue'
import Detail from '../view/Detail.vue'
import News from '../view/News.vue'
import Photo from '../view/Photo.vue'
import Movies from '../view/Movies.vue'
import Video from '../view/Video.vue'
import Err from '../view/Err.vue'

Vue.use(Router)

export default new Router({
  routes: [
		{ path: '/',component:About},
		{ path: '/story',component:Story},
		{ path: '/story/detail',component:Detail},
		{ path: '/about',component:About},
		{ path: '/news',component:News},
		{ path: '/photo',component:Photo},
		{ path: '/movies',component:Movies},
		{ path: '/video',component:Video},
		{ path: '*',component:Err}
  ]
})
