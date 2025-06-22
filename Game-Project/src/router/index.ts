import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesView from '../views/GamesView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import FullpageView from '@/views/FullpageView.vue'

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
      path: '/favorites',
      name: 'Favorites',
      component: FavoritesView,
    },
        {
      path: '/Fullpage/:gameTitle/:id',
      name: 'Fullpage',
      component: FullpageView,
    },
  ],
})

export default router
