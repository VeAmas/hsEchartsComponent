<template>
  <EchartsComponent
    v-bind="$attrs"
    :showTooltip="false"
    :showLegend="false"
    :showDataZoom="false"
    v-on="$listeners"
  >
    <EcTooltip
      v-if="showTooltip"
      trigger="item"
      :textFormatter="tooltipTextFormatter"
    ></EcTooltip>
    <EcSeriesTreemap
      :data="treemapData"
      :levels="[]"
      :label:formatter="formatter"
    ></EcSeriesTreemap>
  </EchartsComponent>
</template>

<script>
// @ts-check
import EchartsComponent from '../main.vue';
import { EcSeriesTreemap, EcTooltip } from '../index.js';
import { basic10Colors, basic20Colors } from '../constant';

/**
 * @typedef {echarts.EChartOption.SeriesTreemap} SeriesTreemap
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
    default:
      () =>
      ({ seriesDatas }) => {
        return {
          seriesDatas: seriesDatas.map(v => {
            return {
              ...v,
              name: v.data.name
            };
          })
        };
      }
  },

  showTooltip: {
    default: true
  },

  /**
   * 是否过滤掉数据中为0的数据
   * @type {Vue.PropOptions<boolean>}
   */
  filterZero: {
    default: true
  },

  /**
   * 格式化用的字符串
   * @type {Vue.PropOptions<string>}
   */
  format: {
    default: undefined
  },

  /**
   * 合并的阈值 超过几个时剩下的会合并成其他 0的时候为不合并
   * @type {Vue.PropOptions<number>}
   */
  aggregateThreshold: {
    default: 0
  },

  /**
   * @type {Vue.PropOptions<{name: string; value: string | number}[]>}
   */
  data: {
    default: []
  }
};

export default {
  name: 'EcLayoutScatter',
  // extends: EchartsComponent,
  components: {
    EchartsComponent,
    EcSeriesTreemap,
    EcTooltip
  },
  props: {
    ...props
  },
  computed: {
    /** @returns {SeriesTreemap['data']}  */
    treemapData() {
      let data = this.data
        /** 过滤掉空的数据 */
        .filter(
          v => v.value !== null && v.value !== undefined && v.value !== ''
        )
        /** 把值转换为数字 */
        .map(v => ({
          name: v.name,
          value: Number(v.value)
        }));

      data.sort((b, a) => a.value - b.value);

      /** 过滤掉0 */
      if (this.filterZero) {
        data = data.filter(v => v.value !== 0);
      }

      /** 颜色列表 超过10个用大集合 其他的颜色为main列表颜色的后一个 */
      const colorList = data.length > 10 ? basic20Colors : basic10Colors;
      const main = data.slice(0, this.aggregateThreshold || Infinity);
      let other = data.slice(this.aggregateThreshold || Infinity);
      if (other.length > 0) {
        other = [
          { value: other.reduce((o, n) => o + n.value, 0), name: '其他' }
        ];
      }

      /** @type {SeriesTreemap['data']} */
      const ret = [
        {
          color: colorList,
          name: '主要',
          children: main
        }
      ];

      /** TODO: 这个要分成两个series 不然其他太大的时候会到主要的前面去 */
      /** 如果有其他 则加入 */
      if (other.length > 0) {
        ret.push({
          color: [colorList[main.length % colorList.length]],
          name: '其他',
          children: other
        });
      }

      return ret;
    }
  },
  methods: {
    formatter(param) {
      /** TODO: 添加columnsFormat方法 */
      const value = this.format
        ? param.value // columnsFormat(param.value, format)
        : param.value;
      return `${param.name}\n(${value})`;
    }
  },
  mounted() {
    /** */
  }
};
</script>
