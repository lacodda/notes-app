import Vue from 'vue';
import Router from 'vue-router';
import Main from 'components/page/Main';
import Login from 'components/page/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      title: 'Main',
      component: Main,
    },
    {
      path: '/login',
      name: 'login',
      title: 'Login',
      component: Login,
    },
  ],
});
