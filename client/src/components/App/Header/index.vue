<template>
  <header :class="$options.name">
    <div :class="`${$options.name}__wrapper`">
      <router-link
        :class="`${$options.name}__logo`"
        :to="{ name: 'home' }">
        LOGO
      </router-link>

      <nav :class="`${$options.name}__nav`">
        <ul :class="`${$options.name}__navList`">
          <li :class="`${$options.name}__navItem`" v-for="(route, key) in routes" :key="key">
            <router-link :to="route" :class="`${$options.name}__navLink`" exact-active-class="is-active">
              {{ route.title }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',

  computed: {
    routes() {
      return this.$router.options.routes.filter(route =>
        route.hasOwnProperty('title'),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../../scss/settings/color';
// @import '../../../scss/objects/wrapper.mixin';

.AppHeader {
  padding-top: 1em;
  padding-bottom: 1em;
  // background: $color-secondary;

  &__wrapper {
    // @include wrapper();

    display: flex;
    align-items: center;
  }

  &__logo {
    text-decoration: none;
    font-weight: 500;

    &,
    &:visited {
      color: inherit;
    }

    @media (min-width: 30em) {
      font-size: 2em;
    }
  }

  &__nav {
    margin-left: 1em;
  }

  &__navList {
    display: flex;
  }

  &__navItem {
    &:not(:first-child) {
      margin-left: 0.5em;

      &::before {
        margin-right: 0.5em;
        content: '|';
      }
    }
  }

  &__navLink {
    text-decoration: none;

    &,
    &:visited {
      color: inherit;
    }

    &:focus,
    &:hover,
    &.is-active {
      text-decoration: underline;
    }
  }
}
</style>
