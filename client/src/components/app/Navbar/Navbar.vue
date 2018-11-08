<template>
  <nav class="navbar">
    <span class="navbar__logo">Notes App</span>
    <ul class="navbar__menu">
      <li class="navbar__menu-item" v-for="(route, key) in routes" :key="key">
        <router-link class="navbar__menu-link btn" exact-active-class="btn--active"
          :to="route"
          :data-text="route.title">
          {{ route.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',

  computed: {
    routes() {
      return this.$router.options.routes.filter(route =>
        route.hasOwnProperty('title'),
      );
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
