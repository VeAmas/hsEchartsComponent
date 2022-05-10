<script>
import { propsObjectSeriesLine } from '../propsObjects';
// @ts-check
import base from './base.vue';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.SeriesLine} SeriesLine
 * @typedef {InstanceType<typeof base>} Base
 */

export default {
  mixins: [base],
  name: 'SeriesLine',
  props: {
    ...propsObjectSeriesLine,

    /** @type {PropOptions<SeriesLine['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['name']>} */
    name: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['coordinateSystem']>} */
    coordinateSystem: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['xAxisIndex']>} */
    xAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['yAxisIndex']>} */
    yAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['polarIndex']>} */
    polarIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['symbol'] | false>} */
    symbol: {
      default: false
    },

    /** @type {PropOptions<SeriesLine['symbolSize']>} */
    symbolSize: {
      default: 2
    },

    /** @type {PropOptions<SeriesLine['symbolRotate']>} */
    symbolRotate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['symbolKeepAspect']>} */
    symbolKeepAspect: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['symbolOffset']>} */
    symbolOffset: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['showSymbol']>} */
    showSymbol: {
      default: true
    },

    /** @type {PropOptions<SeriesLine['showAllSymbol']>} */
    showAllSymbol: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['hoverAnimation']>} */
    hoverAnimation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['legendHoverLink']>} */
    legendHoverLink: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['stack']>} */
    stack: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['cursor']>} */
    cursor: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['connectNulls']>} */
    connectNulls: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['clipOverflow']>} */
    clipOverflow: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['step']>} */
    step: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['label']>} */
    label: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['itemStyle']>} */
    itemStyle: {
      default: () => ({
        borderWidth: 2
      })
    },

    /** @type {PropOptions<SeriesLine['lineStyle']>} */
    lineStyle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['areaStyle']>} */
    areaStyle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['emphasis']>} */
    emphasis: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['smooth']>} */
    smooth: {
      default: false
    },

    /** @type {PropOptions<SeriesLine['smoothMonotone']>} */
    smoothMonotone: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['sampling']>} */
    sampling: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['dimensions']>} */
    dimensions: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['encode']>} */
    encode: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['seriesLayoutBy']>} */
    seriesLayoutBy: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['datasetIndex']>} */
    datasetIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['data']>} */
    data: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['markPoint']>} */
    markPoint: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['markLine']>} */
    markLine: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['markArea']>} */
    markArea: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['z']>} */
    z: {
      default: 2
    },

    /** @type {PropOptions<SeriesLine['silent']>} */
    silent: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animation']>} */
    animation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animationThreshold']>} */
    animationThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animationDuration']>} */
    animationDuration: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animationEasing']>} */
    animationEasing: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animationDelay']>} */
    animationDelay: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animationDurationUpdate']>} */
    animationDurationUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animationEasingUpdate']>} */
    animationEasingUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['animationDelayUpdate']>} */
    animationDelayUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesLine['tooltip']>} */
    tooltip: {
      default: undefined
    }
  },
  computed: {
    /**
     * 该Series是否没有数据
     * @returns {boolean}
     */
    noData() {
      return !this.data?.length;
    }
  },
  data() {
    const data = {
      type: 'line'
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {}
};
</script>
