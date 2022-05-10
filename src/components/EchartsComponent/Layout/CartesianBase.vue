<script>
import { alignTo2DArray } from '../utils';
/**
 * @typedef {echarts.EChartOption.SeriesLine} SeriesLine
 * @typedef {echarts.EChartOption.SeriesBar} SeriesBar
 * @typedef {echarts.EChartOption.XAxis} XAxis
 * @typedef {echarts.EChartOption.YAxis} YAxis
 */

/** @type {import('../main.vue')['props']} */
// @ts-ignore
const MainProps = {};

export const props = {
  ...MainProps,

  /**
   * tooltip文字的formatter
   * @type {Vue.PropOptions<import('../type').TooltipTextFormatter>}
   */
  tooltipTextFormatter: {
    default: undefined
  },

  showLegend: {
    default: true
  },

  showTooltip: {
    default: true
  },

  avoidOverlap: {
    default: false
  },

  xAxisNumber: {
    default: 1
  },

  yAxisNumber: {
    default: 1
  },

  /**
   * y轴是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。
   * 为数组的时候,可以为多个轴分别设置scale。否则表示全部设置为当前值
   * @type {Vue.PropOptions<boolean | boolean[]>}
   */
  xScale: {
    default: () => []
  },

  /**
   * y轴是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。
   * 为数组的时候,可以为多个轴分别设置scale。否则表示全部设置为当前值
   * @type {Vue.PropOptions<boolean | boolean[]>}
   */
  yScale: {
    default: () => []
  },

  /** @type {Vue.PropOptions<string[]>} */
  stacks: {
    default: () => []
  },

  /**
   *  @type {Vue.PropOptions<boolean[] | boolean>}
   * line类型的数据 是否显示区域
   */
  areas: {
    default: false
  },

  /** @type {Vue.PropOptions<number | number[]>} */
  xAxisIndexes: {
    default: () => []
  },

  /** @type {Vue.PropOptions<number | number[]>} */
  yAxisIndexes: {
    default: () => []
  },

  /** @type {Vue.PropOptions<boolean>} */
  alignAxis: {
    default: false
  },

  /**
   * @type {Vue.PropOptions<XAxis['data'] | XAxis['data'][]>}
   */
  xData: {
    default: undefined
  },

  /**
   * @type {Vue.PropOptions<string | string[]>}
   */
  xName: {
    default: () => []
  },

  /**
   * @type {Vue.PropOptions<YAxis['data'] | YAxis['data'][]>}
   */
  yData: {
    default: undefined
  },

  /**
   * @type {Vue.PropOptions<string | string[]>}
   */
  yName: {
    default: () => []
  },

  /**
   * @type {Vue.PropOptions<YAxis['axisLabel']['formatter'] | YAxis['axisLabel']['formatter'][]>}
   */
  xLabelFormatter: {
    default: () => []
  },

  /**
   * @type {Vue.PropOptions<YAxis['axisLabel']['formatter'] | YAxis['axisLabel']['formatter'][]>}
   */
  yLabelFormatter: {
    default: () => []
  },

  /**
   * @type {Vue.PropOptions<(SeriesLine['data'] | SeriesBar['data'])[]>}
   */
  data: {
    default: []
  }
};

export default {
  name: 'CartesianBase',
  props: {
    ...props
  },
  computed: {
    /**
     * x轴列表
     * @returns {number[]}
     */
    xAxisList() {
      return new Array(this.xAxisNumber).fill('').map((v, i) => i);
    },
    /**
     * y轴列表
     * @returns {number[]}
     */
    yAxisList() {
      return new Array(this.yAxisNumber).fill('').map((v, i) => i);
    },
    xDataList() {
      return alignTo2DArray(this.xData);
    },
    yDataList() {
      return alignTo2DArray(this.yData);
    },
    xNameList() {
      return Array.isArray(this.xName) ? this.xName : [this.xName];
    },
    yNameList() {
      return Array.isArray(this.yName) ? this.yName : [this.yName];
    },
    xScaleList() {
      return Array.isArray(this.xScale) ? this.xScale : [this.xScale];
    },
    yScaleList() {
      return Array.isArray(this.yScale) ? this.yScale : [this.yScale];
    },
    xLabelFormatterList() {
      return Array.isArray(this.xLabelFormatter) ? this.xLabelFormatter : [this.xLabelFormatter];
    },
    yLabelFormatterList() {
      return Array.isArray(this.yLabelFormatter) ? this.yLabelFormatter : [this.yLabelFormatter];
    },
    areaList() {
      return Array.isArray(this.areas)
        ? this.areas
        : new Array(this.data.length).fill(this.areas);
    }
  }
};
</script>
