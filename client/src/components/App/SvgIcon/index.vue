<template>
  <div class="svg" :style="{ height:`${size}px`, width:`${size}px` }"> 
    <svg :height="size" :width="size" :fill="color">
      <use xmlns:xlink="http://www.w3.org/1999/xlink"
            :xlink:href="getIcon" 
            @mousemove="onMouseMove"
            @mouseleave="onMouseOut"/>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "20",
    },
    color: {
      type: String,
    },
  },

  computed: {
    getIcon() {
      return `#${this.name}`;
    },
  },

  methods: {
    onMouseMove($event) {
      // console.log($event);
    },

    onMouseOut($event) {
      // console.log("onMouseOut", $event);
    },
  },
};
</script>
