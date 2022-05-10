<script>
import { propsObjectSeriesScatter } from '../propsObjects';
// @ts-check
import base from './base.vue';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.SeriesScatter} SeriesScatter
 * @typedef {InstanceType<typeof base>} Base
 */

export default {
  mixins: [base],
  name: 'SeriesScatter',
  props: {
    ...propsObjectSeriesScatter,

    /** @type {PropOptions<SeriesScatter['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['name']>} */
    name: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['coordinateSystem']>} */
    coordinateSystem: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['xAxisIndex']>} */
    xAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['yAxisIndex']>} */
    yAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['polarIndex']>} */
    polarIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['geoIndex']>} */
    geoIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['calendarIndex']>} */
    calendarIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['hoverAnimation']>} */
    hoverAnimation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['legendHoverLink']>} */
    legendHoverLink: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['symbol']>} */
    symbol: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['symbolSize']>} */
    symbolSize: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['symbolRotate']>} */
    symbolRotate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['symbolKeepAspect']>} */
    symbolKeepAspect: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['symbolOffset']>} */
    symbolOffset: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['large']>} */
    large: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['largeThreshold']>} */
    largeThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['cursor']>} */
    cursor: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['label']>} */
    label: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['itemStyle']>} */
    itemStyle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['emphasis']>} */
    emphasis: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['progressive']>} */
    progressive: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['progressiveThreshold']>} */
    progressiveThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['dimensions']>} */
    dimensions: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['encode']>} */
    encode: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['seriesLayoutBy']>} */
    seriesLayoutBy: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['datasetIndex']>} */
    datasetIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['data']>} */
    data: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['markPoint']>} */
    markPoint: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['markLine']>} */
    markLine: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['markArea']>} */
    markArea: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['z']>} */
    z: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['silent']>} */
    silent: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animation']>} */
    animation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animationThreshold']>} */
    animationThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animationDuration']>} */
    animationDuration: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animationEasing']>} */
    animationEasing: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animationDelay']>} */
    animationDelay: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animationDurationUpdate']>} */
    animationDurationUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animationEasingUpdate']>} */
    animationEasingUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['animationDelayUpdate']>} */
    animationDelayUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesScatter['tooltip']>} */
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
      type: 'scatter'
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {}
};
</script>
