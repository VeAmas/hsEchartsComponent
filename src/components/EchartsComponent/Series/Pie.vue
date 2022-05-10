<script>
import { propsObjectSeriesPie } from '../propsObjects';
// @ts-check
import base from './base.vue';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.SeriesPie} SeriesPie
 * @typedef {InstanceType<typeof base>} Base
 */

export default {
  mixins: [base],
  name: 'SeriesPie',
  props: {
    ...propsObjectSeriesPie,

    /** @type {PropOptions<SeriesPie['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['name']>} */
    name: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['legendHoverLink']>} */
    legendHoverLink: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['hoverAnimation']>} */
    hoverAnimation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['hoverOffset']>} */
    hoverOffset: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['selectedMode']>} */
    selectedMode: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['selectedOffset']>} */
    selectedOffset: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['clockwise']>} */
    clockwise: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['startAngle']>} */
    startAngle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['minAngle']>} */
    minAngle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['minShowLabelAngle']>} */
    minShowLabelAngle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['roseType']>} */
    roseType: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['avoidLabelOverlap']>} */
    avoidLabelOverlap: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['stillShowZeroSum']>} */
    stillShowZeroSum: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['cursor']>} */
    cursor: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['label']>} */
    label: {
      default: () => ({
        normal: {
          formatter: param => {
            if (param.percent >= 20) {
              return param.percent + '%';
            } else {
              return '';
            }
          },
          position: 'inside'
        }
      })
    },

    /** @type {PropOptions<SeriesPie['labelLine']>} */
    labelLine: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['itemStyle']>} */
    itemStyle: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['emphasis']>} */
    emphasis: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['z']>} */
    z: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['center']>} */
    center: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['radius']>} */
    radius: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['seriesLayoutBy']>} */
    seriesLayoutBy: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['datasetIndex']>} */
    datasetIndex: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['data']>} */
    data: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['markPoint']>} */
    markPoint: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['markLine']>} */
    markLine: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['markArea']>} */
    markArea: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['silent']>} */
    silent: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationType']>} */
    animationType: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animation']>} */
    animation: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationThreshold']>} */
    animationThreshold: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationDuration']>} */
    animationDuration: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationEasing']>} */
    animationEasing: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationDelay']>} */
    animationDelay: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationDurationUpdate']>} */
    animationDurationUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationEasingUpdate']>} */
    animationEasingUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['animationDelayUpdate']>} */
    animationDelayUpdate: {
      default: undefined
    },

    /** @type {PropOptions<SeriesPie['tooltip']>} */
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
      type: 'pie'
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {}
};
</script>
