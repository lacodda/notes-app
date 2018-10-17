<template>
  <div class="modal" :class="[cssClass]">

    <!-- TRANSITION OF MODAL WINDOW START -->
    <transition
      name="custom-classes-transition"
      :enter-active-class="enterActiveClass"
      :leave-active-class="leaveActiveClass">

      <!-- MODAL WINDOW START -->
      <div class="modal__component" v-if="visible" :style="modalStyle" @click.self="modalClose">
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__header" :class="{ 'modal__header--sticky': stickyHeader }">
              <slot name="header"></slot>
              <app-svg-icon name="close"
                        size="24"
                        class="modal__close"
                        @click.native="modalClose"/>
            </div>
            <div class="modal__body">
              <slot name="content"></slot>
            </div>
            <div class="modal__footer" :class="{ 'modal__footer--sticky': stickyFooter }">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
      <!-- MODAL WINDOW END -->

    </transition>
    <!-- TRANSITION OF MODAL WINDOW END -->

    <!-- TRANSITION OF MODAL BACKDROP START -->
    <transition
      name="custom-classes-transition"
      enter-active-class="modal__backdrop--fade-in"
      leave-active-class="modal__backdrop--fade-out">

      <!-- MODAL BACKDROP START -->
      <div class="modal__backdrop" v-if="visible" :style="backdropStyle"/>
      <!-- MODAL BACKDROP END -->
    </transition>
    <!-- TRANSITION OF MODAL BACKDROP END -->

  </div>
</template>

<script>
import { zIndex } from 'util/helpers';

export default {
  name: 'AppModal',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    side: {
      type: String,
      default: '',
    },
    stickyHeader: {
      type: Boolean,
      default: false,
    },
    stickyFooter: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    cssClass: '',
    enterActiveClass: '',
    leaveActiveClass: '',
    modalStyle: {},
    backdropStyle: {},
  }),

  watch: {
    visible(show) {
      if (show) {
        this.backdropStyle.zIndex = zIndex();
        this.modalStyle.zIndex = this.backdropStyle.zIndex + 1;

        this.setCssClass(this.side);
      }
    },
  },

  created() {
    const escapeHandler = e => {
      if (e.key === 'Escape' && this.visible) {
        this.modalClose();
      }
    };
    document.addEventListener('keydown', escapeHandler);
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler);
    });
  },

  methods: {
    modalClose() {
      this.$emit('onModalClose');
    },

    setCssClass(side) {
      switch (side) {
        case 'right':
          this.cssClass = 'modal--sticky--right';
          this.enterActiveClass = 'modal__component--fade-in-right';
          this.leaveActiveClass = 'modal__component--fade-out-right';
          break;
        default:
          this.cssClass = '';
          this.enterActiveClass = 'modal__component--slide-up-in';
          this.leaveActiveClass = 'modal__component--slide-up-out';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
