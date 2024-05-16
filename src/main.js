import './style/normalize.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import HomePage from './views/Home.vue';

const routes = [
  { path: '/', component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
