<script>
// @ts-check
import base from './base.vue';
import { propsObjectSeriesBar } from '../propsObjects';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.SeriesBar} SeriesBar
 * @typedef {InstanceType<typeof base>} Base
 */

export default {
  mixins: [base],
  name: 'SeriesBar',
  props: {
    ...propsObjectSeriesBar,

    /** @type {PropOptions<SeriesBar['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['name']>} */
    name: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['legendHoverLink']>} */
    legendHoverLink: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['coordinateSystem']>} */
    coordinateSystem: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['xAxisIndex']>} */
    xAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['yAxisIndex']>} */
    yAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['label']>} */
    label: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['itemStyle']>} */
    itemStyle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['emphasis']>} */
    emphasis: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['stack']>} */
    stack: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['cursor']>} */
    cursor: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['barWidth']>} */
    barWidth: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['barMaxWidth']>} */
    barMaxWidth: {
      default: 22
    },

    /** @type {PropOptions<SeriesBar['barMinWidth']>} */
    barMinWidth: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['barMinHeight']>} */
    barMinHeight: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['barGap']>} */
    barGap: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['barCategoryGap']>} */
    barCategoryGap: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['large']>} */
    large: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['largeThreshold']>} */
    largeThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['progressive']>} */
    progressive: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['progressiveThreshold']>} */
    progressiveThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['progressiveChunkMode']>} */
    progressiveChunkMode: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['dimensions']>} */
    dimensions: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['encode']>} */
    encode: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['seriesLayoutBy']>} */
    seriesLayoutBy: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['datasetIndex']>} */
    datasetIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['data']>} */
    data: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['markPoint']>} */
    markPoint: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['markLine']>} */
    markLine: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['markArea']>} */
    markArea: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['z']>} */
    z: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animation']>} */
    animation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animationThreshold']>} */
    animationThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animationDuration']>} */
    animationDuration: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animationEasing']>} */
    animationEasing: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animationDelay']>} */
    animationDelay: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animationDurationUpdate']>} */
    animationDurationUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animationEasingUpdate']>} */
    animationEasingUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['animationDelayUpdate']>} */
    animationDelayUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBar['tooltip']>} */
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
      type: 'bar'
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {}
};
</script>
