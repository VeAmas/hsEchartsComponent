<template>
  <EchartsComponent
    v-bind="$attrs"
    :showTooltip="showTooltip"
    :showLegend="showLegend"
    v-on="$listeners"
  >
    <EcLegend v-if="showLegend" :avoidOverlap="avoidOverlap"></EcLegend>
    <EcTooltip
      v-if="showTooltip"
      trigger="axis"
      :textFormatter="tooltipTextFormatter"
    ></EcTooltip>
    <EcXaxis
      v-for="(item, index) in xAxisList"
      :key="index + 'x'"
      :scale="xScaleList[index]"
      :axisLabel:formatter="xLabelFormatterList[index]"
      :name="xNameList[index]"
      :data="xDataList[index]"
      :type="xTypeList[index]"
      :boundaryGap="xTypeList[index] === 'category' ? [10, 10] : [0, 0]"
    ></EcXaxis>
    <EcYaxis
      v-for="(item, index) in yAxisList"
      :key="index + 'y'"
      :alignAxis="alignAxis"
      :scale="yScaleList[index]"
      :axisLabel:formatter="yLabelFormatterList[index]"
      :name="yNameList[index]"
      :titleAsName="true"
      :data="yDataList[index]"
      :type="yTypeList[index]"
    ></EcYaxis>
    <template v-for="(item, index) in data || []">
      <EcSeriesLine
        v-if="item.type === 'line'"
        :key="index + 'l'"
        :stack="stacks[index]"
        :yAxisIndex="yAxisIndexes[index]"
        :xAxisIndex="xAxisIndexes[index]"
        :name="item.name"
        :data="item.data"
        :areaStyle:opacity="areaList[index] ? 0.1 : 0"
      ></EcSeriesLine>
      <EcSeriesBar
        v-else
        :key="index + 'b'"
        :stack="stacks[index]"
        :yAxisIndex="yAxisIndexes[index]"
        :xAxisIndex="xAxisIndexes[index]"
        :name="item.name"
        :data="item.data"
      ></EcSeriesBar>
    </template>
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
  EcSeriesLine,
  EcSeriesBar
} from '../index.js';
import CartesianBaseVue from './CartesianBase.vue';

/**
 * @typedef {echarts.EChartOption.SeriesLine} SeriesLine
 * @typedef {echarts.EChartOption.XAxis} XAxis
 * @typedef {echarts.EChartOption.YAxis} YAxis
 */

/** @type {import('./CartesianBase.vue')['props']} */
// @ts-ignore
const CartesianBaseProps = {};

export const props = {
  ...CartesianBaseProps,

  /** @type {Vue.PropOptions<('value' | 'category') | ('value' | 'category')[]>} */
  xType: {
    default: () => []
  },

  /** @type {Vue.PropOptions<('value' | 'category') | ('value' | 'category')[]>} */
  yType: {
    default: () => []
  }
};

export default {
  name: 'EcLayoutLineBar',
  extends: CartesianBaseVue,
  components: {
    EchartsComponent,
    EcTooltip,
    EcLegend,
    EcXaxis,
    EcYaxis,
    EcSeriesLine,
    EcSeriesBar
  },
  computed: {
    xTypeList() {
      const xTypeList = Array.isArray(this.xType) ? this.xType : [this.xType];
      return new Array(Math.max(xTypeList.length, this.xAxisNumber))
        .fill('')
        .map((_, i) => xTypeList[i] ?? 'category');
    },
    yTypeList() {
      const yTypeList = Array.isArray(this.yType) ? this.yType : [this.yType];
      return new Array(Math.max(yTypeList.length, this.xAxisNumber))
        .fill('')
        .map((_, i) => yTypeList[i] ?? 'value');
    }
  },
  props: {
    ...props
  },
  data() {
    const data = {};
    return /** @type {InstanceType<typeof CartesianBaseVue>} */ (data);
  },
  mounted() {
    /** */
  }
};
</script>
