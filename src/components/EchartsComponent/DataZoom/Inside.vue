<script>
// @ts-check
import mixin from './base.vue';

/**
 * @typedef {import('echarts').EChartOption.DataZoom.Inside} DataZoomInsideOption
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {{
 *  generateOption (): DataZoomInsideOption
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
    /** @type {PropOptions<DataZoomInsideOption['id']>} */
    id: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['disabled']>} */
    disabled: {
      default: false
    },

    /** @type {PropOptions<DataZoomInsideOption['xAxisIndex']>} */
    xAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['yAxisIndex']>} */
    yAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['radiusAxisIndex']>} */
    radiusAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['angleAxisIndex']>} */
    angleAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['singleAxisIndex']>} */
    singleAxisIndex: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['filterMode']>} */
    filterMode: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['start']>} */
    start: {
      default: 0
    },

    /** @type {PropOptions<DataZoomInsideOption['end']>} */
    end: {
      default: 100
    },

    /** @type {PropOptions<DataZoomInsideOption['startValue']>} */
    startValue: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['endValue']>} */
    endValue: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['minSpan']>} */
    minSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['maxSpan']>} */
    maxSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['minValueSpan']>} */
    minValueSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['maxValueSpan']>} */
    maxValueSpan: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['orient']>} */
    orient: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['zoomLock']>} */
    zoomLock: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['throttle']>} */
    throttle: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['rangeMode']>} */
    rangeMode: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['zoomOnMouseWheel']>} */
    zoomOnMouseWheel: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['moveOnMouseMove']>} */
    moveOnMouseMove: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['moveOnMouseWheel']>} */
    moveOnMouseWheel: {
      default: undefined
    },

    /** @type {PropOptions<DataZoomInsideOption['preventDefaultMouseMove']>} */
    preventDefaultMouseMove: {
      default: undefined
    }
  },

  data() {
    const data = {
      type: 'inside'
    };
    return /** @type {typeof data & OverrideMixin} */ (data);
  }
};
</script>
