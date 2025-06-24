import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesView from '../views/GamesView.vue'
import FullpageView from '../views/FullpageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // example route
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
        {
      path: '/Games',
      name: 'Games',
      component: GamesView,
    },
        {
      path: '/Fullpage/:gameTitle/:id',
      name: 'Fullpage',
      component: () => import('@/views/FullpageView.vue')
    },
  ],
})

export default router
