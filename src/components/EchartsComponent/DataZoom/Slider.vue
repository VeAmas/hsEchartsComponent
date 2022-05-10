<script>
// @ts-check
import mixin from './base.vue';
import { handleIcon } from '../utils';

/**
 * @typedef {import('echarts').EChartOption.DataZoom.Slider} DataZoomSliderOption
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {{
 *  generateOption (): DataZoomSliderOption
 * }} OverrideProperty
 * @typedef {Omit<Mixin, keyof OverrideProperty> & OverrideProperty} OverrideMixin
 */
/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */

export default {
  mixins: [mixin],
  name: 'EcDataZoomInside',

  props: {

    /** @type {PropOptions<DataZoomSliderOption['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['xAxisIndex']>} */
    xAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['yAxisIndex']>} */
    yAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['radiusAxisIndex']>} */
    radiusAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['angleAxisIndex']>} */
    angleAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['singleAxisIndex']>} */
    singleAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['filterMode']>} */
    filterMode: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['start']>} */
    start: {
      default: 0
    },

    /** @type {PropOptions<DataZoomSliderOption['end']>} */
    end: {
      default: 100
    },

    /** @type {PropOptions<DataZoomSliderOption['startValue']>} */
    startValue: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['endValue']>} */
    endValue: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['minSpan']>} */
    minSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['maxSpan']>} */
    maxSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['minValueSpan']>} */
    minValueSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['maxValueSpan']>} */
    maxValueSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['orient']>} */
    orient: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['zoomLock']>} */
    zoomLock: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['throttle']>} */
    throttle: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['rangeMode']>} */
    rangeMode: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['show']>} */
    show: {
      default: true
    },

    /** @type {PropOptions<DataZoomSliderOption['backgroundColor']>} */
    backgroundColor: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['dataBackground']>} */
    dataBackground: {
      default: () => ({
        areaStyle: {
          color: '#fff'
        }
      })
    },

    /** @type {PropOptions<DataZoomSliderOption['fillerColor']>} */
    fillerColor: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['borderColor']>} */
    borderColor: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['handleIcon']>} */
    handleIcon: {
      default: handleIcon
    },

    /** @type {PropOptions<DataZoomSliderOption['handleSize']>} */
    handleSize: {
      default: '150%'
    },

    /** @type {PropOptions<DataZoomSliderOption['handleStyle']>} */
    handleStyle: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['labelPrecision']>} */
    labelPrecision: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['labelFormatter']>} */
    labelFormatter: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['showDetail']>} */
    showDetail: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['showDataShadow']>} */
    showDataShadow: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['realtime']>} */
    realtime: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['textStyle']>} */
    textStyle: {
      default: {
        color: 'transparent'
      }
    },

    /** @type {PropOptions<DataZoomSliderOption['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['z']>} */
    z: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['left']>} */
    left: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['top']>} */
    top: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['right']>} */
    right: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomSliderOption['bottom']>} */
    bottom: {
      default: 12
    },

    /** @type {PropOptions<number>} */
    height: {
      default: 17
    }
  },

  data() {
    const data = {
      type: 'slider'
    };
    return /** @type {typeof data & OverrideMixin} */ (data);
  }
};
</script>
