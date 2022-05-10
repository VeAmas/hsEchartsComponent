<script>
import { propsObjectSeriesBoxplot } from '../propsObjects';
// @ts-check
import base from './base.vue';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.SeriesBoxplot} SeriesBoxplot
 * @typedef {InstanceType<typeof base>} Base
 */

export default {
  mixins: [base],
  name: 'SeriesBoxplot',
  props: {
    ...propsObjectSeriesBoxplot,

    /** @type {PropOptions<SeriesBoxplot['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['coordinateSystem']>} */
    coordinateSystem: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['xAxisIndex']>} */
    xAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['yAxisIndex']>} */
    yAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['name']>} */
    name: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['legendHoverLink']>} */
    legendHoverLink: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['hoverAnimation']>} */
    hoverAnimation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['layout']>} */
    layout: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['boxWidth']>} */
    boxWidth: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['itemStyle']>} */
    itemStyle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['emphasis']>} */
    emphasis: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['dimensions']>} */
    dimensions: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['encode']>} */
    encode: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['data']>} */
    data: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['markPoint']>} */
    markPoint: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['markLine']>} */
    markLine: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['markArea']>} */
    markArea: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['z']>} */
    z: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['silent']>} */
    silent: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['animationDuration']>} */
    animationDuration: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['animationEasing']>} */
    animationEasing: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['animationDelay']>} */
    animationDelay: {
      default: undefined
    },

    /** @type {PropOptions<SeriesBoxplot['tooltip']>} */
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
      type: 'boxplot'
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {}
};
</script>
