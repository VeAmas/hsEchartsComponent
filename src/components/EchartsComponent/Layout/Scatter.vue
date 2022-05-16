<template>
  <EchartsComponent
    v-bind="$attrs"
    :showTooltip="showTooltip"
    :showLegend="false"
    :showDataZoom="false"
    v-on="$listeners"
  >
    <EcLegend v-if="showLegend" :avoidOverlap="avoidOverlap"></EcLegend>
    <EcTooltip
      v-if="showTooltip"
      trigger="item"
      :textFormatter="tooltipTextFormatter"
    ></EcTooltip>
    <EcXaxis
      type="value"
      :scale="xScale"
      :name="xName"
      :data="xData"
      :boundaryGap="null"
      :axisPointer="{ show: false }"
      :splitLine="{ show: true }"
    ></EcXaxis>
    <EcYaxis
      type="value"
      :scale="yScale"
      :name="yName"
      :titleAsName="true"
      :data="yData"
      :axisPointer="{ show: false }"
      :axisLine="{ show: true }"
    ></EcYaxis>
    <template v-for="(item, index) in data || []">
      <EcSeriesScatter
        :key="index"
        :data="item"
        :symbolSize="symbolSize"
        :name="'x' + index"
      ></EcSeriesScatter>
    </template>
    <EcDataZoomInside v-if="showDataZoom"></EcDataZoomInside>
  </EchartsComponent>
</template>

<script>
// @ts-check
import EchartsComponent from '../main.vue';
import {
  EcTooltip,
  EcLegend,
  EcXaxis,
  EcYaxis,
  EcSeriesScatter,
  EcDataZoomInside
} from '../index.js';

/**
 * @typedef {echarts.EChartOption.SeriesScatter} SeriesScatter
 * @typedef {echarts.EChartOption.XAxis} XAxis
 * @typedef {echarts.EChartOption.YAxis} YAxis
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

  showLegend: {
    default: false
  },

  showTooltip: {
    default: true
  },

  avoidOverlap: {
    default: false
  },

  showDataZoom: {
    default: true
  },

  /** @type {Vue.PropOptions<boolean>} */
  xScale: {
    default: true
  },

  /** @type {Vue.PropOptions<boolean>} */
  yScale: {
    default: true
  },

  /**
   * @type {Vue.PropOptions<string>}
   */
  xName: {
    default: undefined
  },

  /**
   * @type {Vue.PropOptions<string>}
   */
  yName: {
    default: undefined
  },

  /**
   * @type {Vue.PropOptions<SeriesScatter['data'][]>}
   */
  data: {
    default: []
  },

  /**
   * @type {Vue.PropOptions<SeriesScatter['symbolSize']>}
   */
  symbolSize: {
    default: undefined
  }
};

export default {
  name: 'EcLayoutScatter',
  // extends: EchartsComponent,
  components: {
    EchartsComponent,
    EcTooltip,
    EcLegend,
    EcXaxis,
    EcYaxis,
    EcSeriesScatter,
    EcDataZoomInside
  },
  props: {
    ...props
  },
  mounted() {
    /** */
  }
};
</script>
