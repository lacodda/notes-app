<template>
  <app-modal :visible="visible" @onModalClose="modalClose()" class="add-new-widget__modal">

    <template slot="header">
      <div class="modal__title">
        <h5>Title</h5>
        <p><small>Sub Title</small></p>
      </div>
    </template>

    <template slot="content">
      <div>
        <span>Add New Widget</span>
        <button class="btn btn--flex btn--orange navbar__add-widget" @click="addWidget">Modal Window</button>
      </div>
    </template>

    <template slot="footer">
      <button class="btn btn--primary" type="button">1</button>
      <button class="btn btn--primary" type="button">2</button>
      <button class="btn btn--primary" type="button">3</button>
      <button class="btn btn--primary" type="button">4</button>
    </template>

  </app-modal>  
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "app-add-new-widget",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions(["showModal"]),

    addWidget() {
      const modal = {
        component: "app-add-new-widget",
        widgetId: "Top_Rule_Widget",
      };
      this.showModal(modal);
    },

    modalClose() {
      this.$emit("onModalClose");
    },
  },
};
</script>
