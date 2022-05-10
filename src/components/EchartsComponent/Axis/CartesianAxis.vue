<script>
// @ts-check
/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {import('echarts').EChartOption.BasicComponents.CartesianAxis} AxisOption
 */

export const props = {
  /** @type {PropOptions<AxisOption['id']>} */
  id: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['show']>} */
  show: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['gridIndex']>} */
  gridIndex: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['offset']>} */
  offset: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['name']>} */
  name: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['nameLocation']>} */
  nameLocation: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['nameTextStyle']>} */
  nameTextStyle: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['nameGap']>} */
  nameGap: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['nameRotate']>} */
  nameRotate: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['inverse']>} */
  inverse: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['boundaryGap']>} */
  boundaryGap: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['min']>} */
  min: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['max']>} */
  max: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['scale']>} */
  scale: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['splitNumber']>} */
  splitNumber: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['minInterval']>} */
  minInterval: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['interval']>} */
  interval: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['logBase']>} */
  logBase: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['silent']>} */
  silent: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['triggerEvent']>} */
  triggerEvent: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['axisLine']>} */
  axisLine: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['axisTick']>} */
  axisTick: {
    default: () => ({
      show: false
    })
  },
  /** @type {PropOptions<AxisOption['minorTick']>} */
  minorTick: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['axisLabel']>} */
  axisLabel: {
    default: () => ({
      fontSize: 12
    })
  },
  /** @type {PropOptions<AxisOption['splitLine']>} */
  splitLine: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['minorSplitLine']>} */
  minorSplitLine: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['splitArea']>} */
  splitArea: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['data']>} */
  data: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['axisPointer']>} */
  axisPointer: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['zlevel']>} */
  zlevel: {
    default: undefined
  },
  /** @type {PropOptions<AxisOption['z']>} */
  z: {
    default: undefined
  }
};

export default {
  name: 'EcCartesianAxis',
  props: props
};
</script>
