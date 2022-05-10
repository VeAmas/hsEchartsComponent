<script>
// import { propsObjectSeriesHeatmap } from '../propsObjects';
// @ts-check
import base from './base.vue';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.SeriesHeatmap} SeriesHeatmap
 * @typedef {InstanceType<typeof base>} Base
 */

export default {
  mixins: [base],
  name: 'SeriesHeatmap',
  props: {
    // ...propsObjectSeriesHeatmap,

    /** @type {PropOptions<SeriesHeatmap['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['name']>} */
    name: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['coordinateSystem']>} */
    coordinateSystem: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['xAxisIndex']>} */
    xAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['yAxisIndex']>} */
    yAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['polarIndex']>} */
    polarIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['geoIndex']>} */
    geoIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['calendarIndex']>} */
    calendarIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['emphasis']>} */
    emphasis: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['label']>} */
    label: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['symbol']>} */
    symbol: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['symbolSize']>} */
    symbolSize: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['symbolRotate']>} */
    symbolRotate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['symbolKeepAspect']>} */
    symbolKeepAspect: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['symbolOffset']>} */
    symbolOffset: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['large']>} */
    large: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['largeThreshold']>} */
    largeThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['cursor']>} */
    cursor: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['label']>} */
    label: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['itemStyle']>} */
    itemStyle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['emphasis']>} */
    emphasis: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['progressive']>} */
    progressive: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['progressiveThreshold']>} */
    progressiveThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['dimensions']>} */
    dimensions: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['encode']>} */
    encode: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['seriesLayoutBy']>} */
    seriesLayoutBy: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['datasetIndex']>} */
    datasetIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['data']>} */
    data: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['markPoint']>} */
    markPoint: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['markLine']>} */
    markLine: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['markArea']>} */
    markArea: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['z']>} */
    z: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['silent']>} */
    silent: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['animation']>} */
    animation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['animationThreshold']>} */
    animationThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['animationDuration']>} */
    animationDuration: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['animationEasing']>} */
    animationEasing: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['animationDelay']>} */
    animationDelay: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['animationDurationUpdate']>} */
    animationDurationUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['animationEasingUpdate']>} */
    animationEasingUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesHeatmap['tooltip']>} */
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
      type: 'heatmap'
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {}
};
</script>
