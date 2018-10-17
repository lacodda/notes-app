<template>
  <div> 
    <modal-vuex v-for="(item, index) in modals" :key="index" :id="index"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalVuex from './ModalVuex';

export default {
  name: 'app-modals-list',

  components: {
    ModalVuex,
  },

  data() {
    return {
      modals: [],
    };
  },

  watch: {
    modalsList(list) {
      if (this.modals.length > list.length) {
        setTimeout(() => {
          this.modals = [...list];
        }, 300);
      } else {
        this.modals = [...list];
      }
    },
  },

  computed: {
    ...mapGetters(['modalsList']),
  },

  methods: {},
};
</script>
