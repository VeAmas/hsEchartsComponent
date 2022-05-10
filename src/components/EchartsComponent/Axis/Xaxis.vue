<script>
// @ts-check
import mixin from '../mixins/extend.vue';
import CartesianAxis from './CartesianAxis.vue';
import { propsObjectXAxis } from '../propsObjects';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {import('echarts')} echarts
 * @typedef {import('echarts').EChartOption.XAxis} XAxisOption
 * @typedef {{
 *  generateOption (): XAxisOption
 * }} OverrideProperty
 * @typedef {Omit<Mixin, keyof OverrideProperty> & OverrideProperty} OverrideMixin
 */

/** @type {import('./CartesianAxis.vue')['props']} */
// @ts-ignore
const CartesianAxisProps = {};

export const props = {
  ...CartesianAxisProps,

  ...propsObjectXAxis,

  /** @type {PropOptions<XAxisOption['position']>} */
  position: {
    default: undefined
  },

  /** @type {PropOptions<XAxisOption['type']>} */
  type: {
    default: 'category'
  },

  /** @type {PropOptions<XAxisOption['offset']>} */
  offset: {
    default: undefined
  },

  /** @type {PropOptions<XAxisOption['boundaryGap']>} */
  boundaryGap: {
    default: () => [10, 10]
  },

  /** @type {PropOptions<XAxisOption['axisLine']>} */
  axisLine: {
    default: () => undefined
  },

  /** @type {PropOptions<XAxisOption['splitLine']>} */
  splitLine: {
    default: () => ({
      show: false
    })
  },

  /** @type {PropOptions<XAxisOption['axisTick']>} */
  axisTick: {
    default: () => ({
      alignWithLabel: true,
      inside: false,
      length: 5,
      lineStyle: {
        width: 1
      },
      show: false
    })
  },

  /** @type {PropOptions<XAxisOption['axisPointer']>} */
  axisPointer: {
    default: () => ({
      type: 'line',
      lineStyle: {
        color: 'BFC9D5',
        type: 'dashed'
      },
      shadowStyle: {
        opacity: 0.3
      },
      z: 1
    })
  },

  /**
   * @type {PropOptions<boolean>}
   * 是否限制x轴文字不超过grid范围
   */
  clampAxisLabel: {
    default: true
  },

  /**
   * @type {PropOptions<number>}
   * 刻度文字最大宽度 undefined不设置
   */
  maxAxisLabelWidth: {
    default: undefined
  }
};

export default {
  mixins: [mixin, CartesianAxis],
  name: 'EcXAxis',
  props: { ...props },
  data() {
    const data = {
      /** @type {keyof Mixin['owner']['optionFrame']} */
      category: 'xaxis'
    };
    return /** @type {typeof data & OverrideMixin} */ (data);
  },
  render() {
    return null
  },
  methods: {
    /** @param {Mixin['owner']} owner */
    registerToOwner(owner) {
      if (!owner.optionFrame.xaxis.includes(this)) {
        owner.optionFrame.xaxis.push(this);
      }
    },
    unregisterFromOwner() {
      const index = this.owner?.optionFrame.xaxis.indexOf(this);
      if (index > -1) {
        this.owner.optionFrame.xaxis.splice(index, 1);
      }
    },
    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      /** @type {echarts.EChartOption.XAxis[]}  */
      const xAxis = [];
      this.owner.optionFrame.xaxis.forEach((/** @type {typeof this} */ v) => {
        xAxis.push(v.generateOption());
      });
      return {
        xAxis
      };
    }
  }
};
</script>
