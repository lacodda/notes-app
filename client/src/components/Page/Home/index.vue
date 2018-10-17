<template>
  <div class="page__container">
    <!-- <svg class="page__logo" width="300" height="300">
      <use xlink:href="#lyrn"></use>
    </svg> -->
    <h1 class="page__header">Hello Vue.js</h1>

    <button class="btn btn--flex btn--primary" @click="openModal">
      <app-svg-icon name="favorite" color="white" class="icon"/>
      Open Modal
    </button>

    <app-chart :data="data"/>
  </div>
  <!-- <div :class="$options.name">
    <app-hero :action="{ to: { name: 'article' }, label: 'Click me!' }">
      <template slot="headline">
        Welcome!
      </template>
      <h1 class="text">Hello</h1>
      <p>
        Lorem ipsum dolor sit amet,
        <app-link :to="{ name: 'list' }">
          consetetur
        </app-link>
        adipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
      </p>

      <button class="btn btn--flex btn--primary" @click="openModal">
        <svg-icon name="favorite" color="white" class="icon"/>
        Open Modal
      </button>
    </app-hero>

    <app-teaser-list :class="`${$options.name}__teaserList`">
      <app-teaser-list-item>
        <app-teaser :action="{ to: { name: 'article' }, label: 'Read more' }">
          <template slot="headline">
            Article
          </template>

          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed.
          </p>
          <p>
            Diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est.
          </p>
        </app-teaser>
      </app-teaser-list-item>
      <app-teaser-list-item>
        <app-teaser :action="{ to: { name: 'list' }, label: 'Read more' }">
          <template slot="headline">
            List
          </template>

          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed.
          </p>
          <p>
            Diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est.
          </p>
        </app-teaser>
      </app-teaser-list-item>
    </app-teaser-list>
  </div> -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PageHome',

  data() {
    return {
      data: [
            {
                id: 1,
                name: '1',
                color: 'red',
                activeTimeSum: 20,
            },
            {
                id: 2,
                name: '2',
                color: 'purple',
                activeTimeSum: 50,
            },
            {
                id: 3,
                name: '3',
                color: '#999',
                activeTimeSum: 5,
            },
            {
                id: 4,
                name: '4',
                color: 'orange',
                activeTimeSum: 10,
            },
            {
                id: 5,
                name: '5',
                color: 'blue',
                activeTimeSum: 15,
            }
        ],
    }
  },

  methods: {
    ...mapActions(['showModal']),
    openModal() {
      const modal = {
        component: 'app-add-new-widget',
      };
      this.showModal(modal);
    },
  },
};
</script>

<style lang="scss" scoped>
.PageHome {
  $section-spacing: 3em;

  &__teaserList {
    margin-top: $section-spacing;
  }
  .text {
    text-transform: uppercase;
    background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
    color: transparent;
    -webkit-background-clip: text;
    font: {
      size: 100px;
    }
  }
}
.btn--primary {
  margin: 0 auto;
}
.icon {
  margin-right: 0.5rem;
}
</style>
