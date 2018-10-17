<template>
    <div class="container" @click="menuToggle">
        <div class="menu">
            <div class="hambergerIcon" :class="{open: hambergerOpen}"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AppBurgerButton',

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
      this.hambergerOpen = !this.hambergerOpen

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


$color: rgb(51, 8, 103);
$color2: linear-gradient(to right, rgb(48, 207, 208) 0%, rgb(51, 8, 103) 100%);

@mixin position-center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}



$t: 0.2s;
$tf: 0.3s;
$delay: 0.2s;

.container {
  position: fixed;
  z-index: 2;
  top: 18px;
  right: 28px;
  margin: auto;
}
.menu {
  height: 40px;
  width: 40px;
  position: relative;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  &:hover {
    cursor: pointer;
  }
}

.hambergerIcon {
  height: 5px;
  width: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50px;
  background-color: #4a2545;
  // transform: translate(-50%,-50%) rotate(0deg);
  animation: rotateBack $t ease-out forwards;
  // animation-direction: reverse;
  // animation-direction: reverse; // transform: translate(-50%,-50%) rotate(0deg);
  // transition: all ease 0.5s;
  &::before,
  &::after {
    content: '';
    position: absolute;
    height: inherit;
    border-radius: inherit;
    background-color: inherit;
    margin: auto;
    width: 100%;
    transition: all ease 0.5s;
  }
  &::before {
    top: -10px;
    left: 0;
    transform-origin: center;
    // animation: rotate $t $delay ease-out forwards;
  }
  &::after {
    bottom: -10px;
    left: 0;
    transform-origin: center;
    animation: slideToCenterY $t ease-out forwards;
  }
}
.open {
  // transform: translate(-50%,-50%) rotate(135deg);
  // animation: rotate $t ease-out;
  animation: rotate $t ease-out forwards;
  // animation-direction: reverse;
  &::before {
    top: 0;
    animation: slideToCenterY $t ease-out forwards,
      rotate3 $tf $delay ease-out forwards;
    // transform: translate(0, 0%) rotate(-90deg);
  }
  &::after {
    bottom: 0;
    transform: translate(0, 0%) rotate(-90deg);
  }
}
@keyframes rotateBack {
  from {
    transform: translate(-50%, -50%) rotate(135deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}
@keyframes rotate45 {
  to {
    transform: translate(-50%, -50%) rotate(135deg);
  }
}
@keyframes rotate3 {
  to {
    // transform: translate(0, 0%) rotate(450deg);
    transform: translate(0, 0%) rotate(90deg);
  }
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(135deg);
  }
}
@keyframes slideToCenterY {
  to {
    transform: translateY(0);
  }
  // 60% {
  // }
  // 100% {
  // }
}
</style>
