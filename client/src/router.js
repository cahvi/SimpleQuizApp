import Vue from 'vue';
import Router from 'vue-router';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import TestIndex from './components/Test/TestIndex';
import TestDetail from './components/Test/TestDetail';

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
      path: '/tests',
      name: 'tests',
      component: TestIndex
    },
    {
      path: '/tests/:testId',
      name: 'testdetail',
      component: TestDetail
    },
    {
      path: '*',
      redirect: 'register'
    }
  ]
});
