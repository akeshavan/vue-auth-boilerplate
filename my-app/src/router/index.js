import Vue from 'vue';
import Router from 'vue-router';
import About from '@/components/About';
import Home from '@/components/Home';
import Profile from '@/components/Profile';
import Coins from '@/components/Coins';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/coins/:id',
      name: 'Coins',
      component: Coins,
    },
  ],
});
