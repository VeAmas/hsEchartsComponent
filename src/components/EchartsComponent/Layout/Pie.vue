<template>
  <EchartsComponent
    v-bind="$attrs"
    :showDataZoom="false"
    :showTooltip="showTooltip"
    :showLegend="showLegend"
    v-on="$listeners"
  >
    <EcTooltip
      v-if="showTooltip"
      trigger="item"
      :textFormatter="tooltipTextFormatter"
    ></EcTooltip>
    <EcPieLegend :textFormatter="legendTextFormatter"></EcPieLegend>
    <EcSeriesPie
      v-for="(item, index) in seriesList"
      :key="index"
      :data="item"
      :center="seriesList !== data ? center : (center || {})[index]"
      :radius="seriesList !== data ? radius : (radius || {})[index]"
    ></EcSeriesPie>
    <slot></slot>
  </EchartsComponent>
</template>

<script>
import EchartsComponent from '../main.vue';
import { EcTooltip, EcPieLegend, EcSeriesPie } from '../index.js';

/**
 * @typedef {echarts.EChartOption.SeriesPie} SeriesPie
 */

/** @type {import('../main.vue')['props']} */
// @ts-ignore
const echartsComponentProps = {};

export const props = {
  ...echartsComponentProps,

  /**
   * @type {Vue.PropOptions<import('../type').TooltipTextFormatter>}
   */
  tooltipTextFormatter: {
    default: undefined
  },

  /**
   * @type {Vue.PropOptions<echarts.EChartOption.Legend.Formatter>}
   */
  legendTextFormatter: {
    default: undefined
  },

  showTooltip: {
    default: true
  },

  /**
   * @type {Vue.PropOptions<
   *   | SeriesPie['data']
   *   | SeriesPie['data'][]
   * >}
   */
  data: {
    default: []
  },

  /**
   * @type {Vue.PropOptions<
   *   | SeriesPie['center']
   *   | SeriesPie['center'][]
   * >}
   */
  center: {
    default: undefined
  },

  /**
   * @type {Vue.PropOptions<
   *   | SeriesPie['radius']
   *   | SeriesPie['radius'][]
   * >}
   */
  radius: {
    default: undefined
  }
};

export default {
  name: 'EcLayoutPie',
  // extends: EchartsComponent,
  components: {
    EchartsComponent,
    EcTooltip,
    EcPieLegend,
    EcSeriesPie
  },
  computed: {
    /**
     * 实际上的数据
     * @returns {SeriesPie['data'][]}
     */
    seriesList() {
      if (this.data?.length > 0) {
        /**
         * @param {typeof this.data} x
         * @return {x is SeriesPie['data'][]}
         */
        const is2DyArray = x => Array.isArray(x[0]);
        if (is2DyArray(this.data)) {
          return this.data;
        } else {
          return [this.data];
        }
      } else {
        return [];
      }
    }
  },
  props: {
    ...props
  },
  mounted() {
    /** */
  }
};
</script>
