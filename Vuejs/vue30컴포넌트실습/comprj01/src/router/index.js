import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/3103',
    name: '3103',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3103View.vue'),
  },
  {
    path: '/3104',
    name: '3104',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3104View.vue'),
  },
  {
    path: '/3403',
    name: '3403',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3403View.vue'),
  },
  {
    path: '/34ex',
    name: '34ex',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue34exView.vue'),
  },
  {
    path: '/3701',
    name: '3701',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Vue3701View.vue'),
  },
  {
    path: '/imageSlider',
    name: 'imageSlider',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ImageSliderView.vue'),
  },
  {
    path: '/4301',
    name: '4301',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Page4301View.vue'),
  },
  {
    path: '/todo',
    name: 'todo',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/TodoView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
