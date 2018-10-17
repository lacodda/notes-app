<template>
  <component :is="component" :id="widgetId" :visible="visible" @onModalClose="hideModal"/>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "modal-vuex",

  props: {
    id: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    visible: false,
    component: String,
    widgetId: "",
  }),

  computed: {
    ...mapGetters(["modal", "modalsCount"]),
  },

  watch: {
    modal(e) {
      if (!e(this.id)) {
        this.visible = false;
      }
    },
  },

  destroyed() {
    this.bodyModalToggle(this.modalsCount);
  },

  beforeDestroy() {
    this.visible = false;
  },

  created() {
    this.bodyModalToggle(this.modalsCount);

    const modal = this.modal(this.id);

    this.component = modal.component;
    this.widgetId = modal.widgetId;

    // set timeout for correct animation and calculation z-index
    setTimeout(() => {
      this.visible = Boolean(modal);
    }, 0);
  },

  methods: {
    ...mapActions(["hideModal"]),

    // add or remove "overflow: hidden" on "body" tag
    bodyModalToggle(open = true) {
      const el = document.body;
      if (open) {
        // Add to body class 'modal-open'
        el.classList.add("modal-open");
      } else {
        // Remove from body class 'modal-open'
        el.classList.remove("modal-open");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
