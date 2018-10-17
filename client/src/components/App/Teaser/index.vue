<template>
  <div :class="$options.name">
    <app-headline :level="3">
      <slot name="headline"/>
    </app-headline>

    <app-text :class="`${$options.name}__text`">
      <slot/>
    </app-text>

    <app-button
      v-if="action"
      :to="action.to"
      :class="`${$options.name}__action`">
      {{ action.label }}
    </app-button>
  </div>
</template>

<script>
  export default {
    name: 'AppTeaser',

    props: {
      action: {
        type: Object,
      },
    },
  };
</script>

<style lang="scss" scoped>
  // @import '../../../scss/objects/card.mixin';

  .AppTeaser {
    // @include card();

    &__text,
    &__action {
      margin-top: 1em;
    }
  }
</style>
