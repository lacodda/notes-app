<template>
  <div class="dropdown" :class="{'dropdown--active': isShow}">
    <button class="btn btn--default dropdown__toggle"
      :disabled="items.length == 0"
      @click="autoShow">
      {{ selectedText }}
    </button>
    <transition name="custom-classes-transition"
                enter-active-class="animation__fade-in"
                leave-active-class="animation__fade-out">
      <div class="dropdown__menu" v-if="isShow && items.length > 0" :style="dropdownMenuStyle">
        <div v-for="item in items"
          :data-title="item.label"
          :class="{selected: item.selected}"
          class="dropdown__item"
          @click="!multiple && itemClicked(item)">
          {{ item.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { zIndex } from '@/utils/helpers';

const EMPTY_FN = () => {};

let idx = 0;

export default {
  name: 'AppDropdown',

  data() {
    return {
      selected: [],
      isShow: false,
      items: [],
      dropdownMenuStyle: {},
    };
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    grouped: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Please choose',
    },
    width: {
      type: Number,
      default: 120,
    },
    fixListWidth: {
      type: Boolean,
      default: true,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    cbChanged: {
      type: Function,
      default: EMPTY_FN,
    },
    cbItemChanged: {
      type: Function,
      default: EMPTY_FN,
    },
    cbCustomSelectedText: {
      type: Function,
      default: EMPTY_FN,
    },
  },

  computed: {
    cls() {
      let c = {
        grouped: this.grouped,
        multiple: this.multiple,
      };
      return c;
    },

    selectedText() {
      let text = '';
      let fn = selected => selected.map(e => e.label).join(', ');
      if (this.cbCustomSelectedText !== EMPTY_FN) {
        text = this.cbCustomSelectedText(this.selected, fn);
      } else {
        text = fn(this.selected);
      }
      return text === '' ? this.placeholder : text;
    },
  },

  watch: {
    data: {
      immediate: true,
      handler(val) {
        this.selected = this.data.filter(d => d.selected);
        this.items = this.data.slice(0);
      },
    },
  },

  methods: {
    id(item) {
      return 'hsy-dropdown-item-' + item._idx;
    },

    appendIdx(item) {
      if (item._idx === undefined) {
        item._idx = ++idx;
      }
    },

    autoShow() {
      this.isShow = !this.isShow;
      this.dropdownMenuStyle.zIndex = zIndex();
    },

    setupTitleIfNeeded() {
      if (!this.fixListWidth) return;
    },

    autoHide(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isShow = false;
      }
    },

    findSelected() {
      if (!this.grouped) {
        return this.data.filter(d => d.selected === true);
      }
      let items = [];
      return this.data
        .reduce((pre, e) => {
          pre = pre.concat(e.children);
          return pre;
        }, items)
        .filter(d => d.selected === true);
    },

    itemClicked(item) {
      this.$emit('onItemClicked', item);
      if (!this.multiple) {
        if (this.selected.indexOf(item) === -1) {
          this.findSelected().forEach(d => (d.selected = false));
          item.selected = true;
          this.selected.pop();
          this.selected.push(item);

          if (this.cbChanged !== EMPTY_FN) {
            this.cbChanged(this.findSelected());
          }
        }
        this.$nextTick(() => {
          this.isShow = false;
        });
      }
    },

    checkboxChanged(item) {
      if (this.selected === null) {
        this.selected = [];
      }

      let id = this.id(item);
      item.selected = document.querySelector('#' + id).checked;

      if (!item.selected) {
        this.selected = this.selected.filter(d => d !== item);
      } else {
        this.selected.push(item);
      }

      if (this.cbItemChanged !== EMPTY_FN) {
        this.cbItemChanged(item);
      }
      if (this.cbChanged !== EMPTY_FN) {
        this.cbChanged(this.selected);
      }
    },
  },

  updated() {
    this.setupTitleIfNeeded();
  },

  mounted() {
    this.setupTitleIfNeeded();
    document.addEventListener('click', this.autoHide, false);
  },

  destroyed() {
    document.removeEventListener('click', this.autoHide, false);
  },
};
</script>

<style lang="scss" scoped>
.dropdown__menu {
  display: inline-block;
}
</style>
