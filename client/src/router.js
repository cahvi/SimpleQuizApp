import Vue from 'vue';
import Router from 'vue-router';
import Register from './components/Register';
import SecurePage from './components/SecurePage';
import Login from './components/Login';
import Index from './components/Index';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/securepage',
      name: 'securepage',
      component: SecurePage
    }
  ]
});
