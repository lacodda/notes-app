<template>
  <nav>
    <ul class="menu">
      <li class="nav-item" v-for="(route, key) in routes" :key="key">
        <router-link class="nav-link" exact-active-class="is-active"
          :to="route"
          :data-text="route.title"
          @click.native="close">
          {{ route.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppOverlayNav',

  computed: {
    routes() {
      return this.$router.options.routes.filter(route =>
        route.hasOwnProperty('title'),
      );
    },
  },

  methods: {
    close() {
      const el = document.body;
      const open = el.classList.contains('open');

      if (open) {
        console.log('open', open);
        setTimeout(() => {
          // Remove from body class 'open'
          el.classList.remove('open');
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$background: linear-gradient(
  to bottom,
  rgba(48, 207, 208, 0.9) 0%,
  rgba(51, 8, 103, 0.9) 100%
);
$text-color: linear-gradient(
  to right,
  rgb(48, 207, 208) 0%,
  rgb(51, 8, 103) 100%
);

@mixin position-center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    cursor: pointer;
    padding: 6px 20px;
    font-size: 48px;
  }
}

nav {
  z-index: 1;
  position: fixed;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  overflow: hidden;
  &:before {
    content: '';
    @include position-center;
    background: $background;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 100%;
    transform: scale(0.04), translateY(9999px);
    overflow: hidden;
  }
  .open & {
    top: 0;
    &:before {
      animation: menu-animation 0.8s ease-out forwards;
    }
  }
}

ul.menu {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  perspective: 1000;
  color: white;

  li {
    opacity: 0;
    text-align: center;
    text-transform: uppercase;
    transform: translate3d(0, 36px, 0);

    a {
      color: #fff;
      text-decoration: none;

      &:before {
        content: '';
        @include position-center;
        left: auto;
        background-color: white;
        height: 100%;
        width: 0;
        overflow: hidden;
        transition: width 0.14s ease-out;
      }

      &:after {
        opacity: 0;
        content: attr(data-text);
        @include position-center;

        color: transparent;
        background: $text-color;
        -webkit-background-clip: text;

        overflow: hidden;
        transform: translate(-24px, 6px);
        transition: transform 0.1s ease-out, opacity 0.1s ease-out;
      }

      &.is-active,
      &:hover {
        &:before {
          left: 0;
          right: auto;
          width: 100%;
        }
        &:after {
          opacity: 1;
          padding: 0 20px;
          transform: translate(0px, 6px);
          transition: transform 0.2s 0.14s ease-out, opacity 0.2s 0.14s ease-out;
        }
      }
    }

    .open & {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      transition: transform 0.2s ease-out, opacity 0.2s ease-out;
      @for $i from 1 to 5 {
        &:nth-child(#{$i}) {
          transition-delay: $i * 0.1s + 0.65s;
        }
      }
    }
  }
}

@keyframes menu-animation {
  0% {
    opacity: 0;
    transform: scale(0.04) translateY(300%);
  }
  40% {
    transform: scale(0.04) translateY(0);
    transition: ease-out;
  }
  40% {
    transform: scale(0.04) translateY(0);
  }
  60% {
    opacity: 1;
    transform: scale(0.02) translateY(0px);
  }
  61% {
    transform: scale(0.04);
  }
  99.9% {
    height: 0;
    padding-bottom: 100%;
    border-radius: 100%;
  }
  100% {
    transform: scale(2);
    height: 100%;
    padding-bottom: 0;
    border-radius: 0;
  }
}
</style>
