import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import PlatformView from '../views/PlatformView.vue'
import TagsView from '../views/TagsView.vue'
import RandomView from '../views/RandomView.vue'
import FavoritesView from '../views/FavoritesView.vue'

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
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
    },
        {
      path: '/platform',
      name: 'Platform',
      component: PlatformView,
    },
        {
      path: '/tags',
      name: 'Tags',
      component: TagsView,
    },
        {
      path: '/random',
      name: 'Random',
      component: RandomView,
    },
        {
      path: '/favorites',
      name: 'Favorites',
      component: FavoritesView,
    },
  ],
})

export default router
