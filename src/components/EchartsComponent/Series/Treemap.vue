<script>
// @ts-check
import { propsObjectSeriesTreemap } from '../propsObjects';
import base from './base.vue';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.SeriesTreemap} SeriesTreemap
 * @typedef {InstanceType<typeof base>} Base
 */

export const props = {
  ...propsObjectSeriesTreemap,

  /** @type {PropOptions<SeriesTreemap['id']>} */
  id: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['name']>} */
  name: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['zlevel']>} */
  zlevel: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['z']>} */
  z: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['left']>} */
  left: {
    default: 0
  },

  /** @type {PropOptions<SeriesTreemap['top']>} */
  top: {
    default: 0
  },

  /** @type {PropOptions<SeriesTreemap['right']>} */
  right: {
    default: 0
  },

  /** @type {PropOptions<SeriesTreemap['bottom']>} */
  bottom: {
    default: 0
  },

  /** @type {PropOptions<SeriesTreemap['width']>} */
  width: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['height']>} */
  height: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['squareRatio']>} */
  squareRatio: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['leafDepth']>} */
  leafDepth: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['drillDownIcon']>} */
  drillDownIcon: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['roam']>} */
  roam: {
    default: false
  },

  /** @type {PropOptions<SeriesTreemap['nodeClick']>} */
  nodeClick: {
    default: false
  },

  /** @type {PropOptions<SeriesTreemap['zoomToNodeRatio']>} */
  zoomToNodeRatio: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['levels']>} */
  levels: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['silent']>} */
  silent: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['visualDimension']>} */
  visualDimension: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['visualMin']>} */
  visualMin: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['visualMax']>} */
  visualMax: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['colorAlpha']>} */
  colorAlpha: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['colorSaturation']>} */
  colorSaturation: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['colorMappingBy']>} */
  colorMappingBy: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['visibleMin']>} */
  visibleMin: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['childrenVisibleMin']>} */
  childrenVisibleMin: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['label']>} */
  label: {
    default: () => ({
      show: true
    })
  },

  /** @type {PropOptions<SeriesTreemap['upperLabel']>} */
  upperLabel: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['itemStyle']>} */
  itemStyle: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['emphasis']>} */
  emphasis: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['breadcrumb']>} */
  breadcrumb: {
    default: () => ({
      show: false
    })
  },

  /** @type {PropOptions<SeriesTreemap['data']>} */
  data: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['animationDuration']>} */
  animationDuration: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['animationEasing']>} */
  animationEasing: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['animationDelay']>} */
  animationDelay: {
    default: undefined
  },

  /** @type {PropOptions<SeriesTreemap['tooltip']>} */
  tooltip: {
    default: undefined
  }
};

export default {
  mixins: [base],
  name: 'SeriesTreemap',
  props: {
    ...props
  },
  data() {
    const data = {
      type: 'treemap'
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {}
};
</script>
