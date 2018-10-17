import Vue from 'vue';
import VueRouter from 'vue-router';
import PageHome from 'components/Page/Home';
import PageArticle from 'components/Page/Article';
import PageList from 'components/Page/List';

Vue.use(VueRouter);
export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: PageHome,
      title: 'Home',
    },
    {
      name: 'article',
      path: '/article',
      component: PageArticle,
      title: 'Article',
    },
    {
      name: 'list',
      path: '/list',
      component: PageList,
      title: 'List',
    },
  ],
  mode: 'history',
});
