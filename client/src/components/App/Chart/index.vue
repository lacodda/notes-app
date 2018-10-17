<template>
  <div class="chart-container">
    <div class="chart-item donut">
          <!-- <dropdown *ngIf="tooltipVisible" class="dropdown">
              <div class="dropdown__menu" #dropdownMenu
                  [style.bottom.px]="tooltipCoords.bottom"
                  [style.left.px]="tooltipCoords.left">
                  <div class="dropdown__arrow"></div>
                  {{tooltipData.name}}
              </div>
          </dropdown> -->

      <svg width="100%" viewBox="-1 -1 2 2" style="transform: rotate(-90deg)">
        <circle class="circle__outer"></circle>
        <g v-for="(slice, index) in pathData" :key="index" class="circle__slice">
          <path class="slice"
            :d="slice.path"
            :fill="slice.color"
            :id="'path' + slice.id"
            @click="onClick(slice)"/>
                <!--<title>{{slice.name}}</title>-->
        </g>
        <circle class="circle__inner"></circle>
      </svg>
    </div>

      <!-- <div class="chart-item chart-container" *ngIf="showLegend">
          <div class="chart-item chart-container" *ngFor="let row of productivity; let i=index;" [attr.title]="row.productivityName">
              <div class="chart-item circle" [style.background]="row.productivityColor"></div>
              <span class="chart-item">{{row.productivityPercents | number : '1.0-0'}}%</span>
          </div>
      </div> -->
  </div>
</template>

<script>
import { Slice } from './Slice';

export default {
  name: 'AppChart',

  props: {
    data: {
      type: Array,
    },
    type: {
      type: String,
      default: 'donut',
    },
    efficiency: {
      type: Boolean,
    },
    showLegend: {
      type: Boolean,
    },
    segmentsLimit: {
      type: Number,
      default: 100,
    },
  },

  data: () => ({
    colors: [],
    labels: [],
    sortData: [],
    pathData: [],
    tooltipVisible: false,
    tooltipData: null,
    tooltipCoords: { bottom: 0, left: 0 },

    selectedSlice: null,
  }),

  created() {
    this.updateChart(this.segmentsLimit);
  },

  watch: {},

  methods: {
    /*
    @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent) {
        this.tooltipCoords = {
            bottom: event.offsetX - 65,
            left: event.offsetY,
        }
    }
    */

    /**
     * Наведение курсора на сегмент
     *
     * @param data
     */
    onMouseenter(data) {
      this.tooltipVisible = true;
      this.tooltipData = data;
    },

    /**
     * Снятие наведения курсора с сегмента
     */
    onMouseleave() {
      this.tooltipVisible = false;
    },

    /**
     * Подготовка данных для диаграммы
     *
     * @param {number} limit
     */
    updateChart(limit) {
      // sort data and slice by limit
      this.sortData = this.orderData(this.data).slice(0, limit);
      // calculate one percent
      const onePercent = this.calculateOnePercent(this.sortData);
      const slices = [];

      this.sortData.reduce((sum, slice) => {
        const percent =
          slice.percent === undefined
            ? slice.activeTimeSum / onePercent
            : slice.percent;
        const cumulativePercent = sum > 0 ? sum / onePercent : 0;
        slices.push(
          new Slice({
            ...slice,
            ...{
              percent,
              cumulativePercent,
            },
          }),
        );
        return sum + slice.activeTimeSum;
      }, 0);

      this.pathData = slices;
      this.$emit('load', this.pathData);
    },

    /**
     * Посчитает один процент для продуктивности
     *
     * @param data
     * @returns {number}
     */
    calculateOnePercent(data) {
      return data.reduce((prev, cur) => prev + cur.activeTimeSum, 0) * 0.01;
    },

    /**
     * Сортировка списка продуктивностей
     *
     * @param data
     * @param asc
     * @returns {[ActivityCalendarProductivityRow]}
     */
    orderData(data, asc = false) {
      data.sort((a, b) => {
        const factor = !asc ? -1 : 1;

        return a.activeTimeSum < b.activeTimeSum
          ? -factor
          : a.activeTimeSum > b.activeTimeSum ? factor : 0;
      });

      return data;
    },

    /**
     * Клик по сегменту
     *
     * @param slice
     */
    onClick(slice) {
      if (!slice.selected) {
        slice.select();

        if (this.selectedSlice) {
          this.selectedSlice.unselect();
        }

        this.selectedSlice = slice;
        this.$emit('select', slice);
      } else {
        slice.unselect();
        this.selectedSlice = null;
        this.$emit('unselect', slice);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
svg {
  height: auto;
}

.donut {
  position: relative;
  //cursor: pointer;
}

.dropdown {
  position: absolute;
  width: 100%;
  height: 100%;
}

.dropdown__menu {
  right: inherit !important;
  top: inherit !important;
  display: inline-block;
  white-space: nowrap;
  padding: 1rem;
  min-width: auto;
}

.arc {
  width: 14px;
  height: 14px;
  overflow: hidden;
  display: inline-block;
}

.arc-inner {
  border: 5px solid #000;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border-left-color: rgba(0, 0, 0, 0);
  border-right-color: rgba(0, 0, 0, 0);
  border-bottom-color: rgba(0, 0, 0, 0);
  margin-left: -1px;
  margin-top: 7px;
}

.circle {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  &__outer {
    cx: 0;
    cy: 0;
    r: 1.05;
    fill: #f4f4f4;
    stroke: #fff;
    stroke-width: 0.01;
    transform: scale(0.95);
  }
  &__inner {
    cx: 0;
    cy: 0;
    r: 0.55;
    fill: #fff;
    stroke: #fff;
    stroke-width: 0.01;
    transform: scale(0.95);
  }
  &__slice {
    transform: scale(0.95);
  }
}

.chart {
  font-size: 12px;
  &-container {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    align-content: center;

    position: relative;
    width: 100%;
  }
  &-item {
    //flex: 1 1 auto;
    margin: 2px;
    //&[title] {
    //    cursor: help;
    //}
  }
}

.slice {
  stroke: #fff;
  stroke-width: 0.01;
  transition: all 0.2s ease;
}
</style>
