<template>
  <div :class="$options.name">

    <app-overlay-nav/>
    <app-burger-button/>

    <slot name="header">
      <!-- <app-header/> -->
    </slot>

    <main :class="`${$options.name}__main`">
      <slot/>
    </main>

    <slot name="footer">
      <!-- <app-footer/> -->
    </slot>

    <app-modals-list/>
  
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',

  data() {
    return {
      open: false,
      hambergerOpen: false,
    };
  },

  methods: {
    menuToggle() {
      const el = document.body;
      const open = el.classList.contains('open');
      this.hambergerOpen = !this.hambergerOpen;

      if (!open) {
        // Add to body class 'open'
        el.classList.add('open');
      } else {
        // Remove from body class 'open'
        el.classList.remove('open');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '../../../scss/objects/wrapper.mixin';

.LayoutDefault {
  &__main {
    // @include wrapper();
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 3em;
    padding-bottom: 4em;
    transition: 0.2s ease-out;

    .open & {
      transform: scale(0.92);
      transition: transform 0.2s 0.41s ease-out;
    }
  }
}
</style>
