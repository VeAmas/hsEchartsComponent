<template>
  <EchartsComponent
    v-bind="$attrs"
    :showTooltip="showTooltip"
    :showLegend="showLegend"
    :showDataZoom="showDataZoom"
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
    ></EcXaxis>
    <EcYaxis
      v-for="(item, index) in yAxisList"
      :key="index + 'y'"
      :scale="yScaleList[index]"
      :name="yNameList[index]"
      :titleAsName="true"
      :axisLabel:formatter="yLabelFormatterList[index]"
      :alignAxis="alignAxis"
      :data="yDataList[index]"
    ></EcYaxis>
    <EcSeriesLine
      v-for="(item, index) in data || []"
      :key="index + 'l'"
      :stack="stacks[index]"
      :yAxisIndex="yAxisIndexes[index]"
      :xAxisIndex="xAxisIndexes[index]"
      :name="item.name"
      :areaStyle:opacity="areaList[index] ? 0.1 : 0"
      :data="item.data"
    ></EcSeriesLine>
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
  EcSeriesLine
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

  showDataZoom: {
    default: false
  }
};

export default {
  name: 'EcLayoutLine',
  extends: CartesianBaseVue,
  components: {
    EchartsComponent,
    EcTooltip,
    EcLegend,
    EcXaxis,
    EcYaxis,
    EcSeriesLine
  },
  props: {
    ...props
  },
  computed: {},
  data() {
    const data = {};
    return /** @type {InstanceType<typeof CartesianBaseVue>} */ (data);
  },
  mounted() {
    /** */
  }
};
</script>
