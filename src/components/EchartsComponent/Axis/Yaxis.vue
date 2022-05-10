<script>
// @ts-check
import mixin from '../mixins/extend.vue';
import CartesianAxis from './CartesianAxis.vue';
import { propsObjectYAxis } from '../propsObjects';

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */
/**
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {InstanceType<typeof CartesianAxis>} CartesianAxis
 * @typedef {import('echarts')} echarts
 * @typedef {import('echarts').EChartOption.YAxis} YAxisOption
 * @typedef {{
 *  generateOption (): YAxisOption
 * }} OverrideProperty
 * @typedef {Omit<Mixin, keyof OverrideProperty> & OverrideProperty} OverrideMixin
 */

/** @type {import('./CartesianAxis.vue')['props']} */
// @ts-ignore
const CartesianAxisProps = {};

const props = {
  ...CartesianAxisProps,

  ...propsObjectYAxis,

  /** @type {PropOptions<YAxisOption['position']>} */
  position: {
    default: undefined
  },

  /** @type {PropOptions<YAxisOption['type']>} */
  type: {
    default: 'value'
  },

  /** @type {PropOptions<YAxisOption['offset']>} */
  offset: {
    default: undefined
  },

  /** @type {PropOptions<YAxisOption['splitLine']>} */
  splitLine: {
    default: () => undefined
  },

  /** @type {PropOptions<YAxisOption['axisLine']>} */
  axisLine: {
    default: () => ({
      show: false
    })
  },

  /** @type {PropOptions<YAxisOption['axisTick']>} */
  axisTick: {
    default: () => ({
      show: false
    })
  },

  /** @type {PropOptions<YAxisOption['axisPointer']>} */
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

  /** 是否用title替代y轴的名称 */
  titleAsName: {
    default: false
  },

  /**
   * ```
   * 双y轴的情况下是否对齐压轴
   * 必须两个y轴都设置这个值才有效
   * 对齐之后 y轴的分割线会取第一个y轴的interval的值 (不传就是6)
   * 双y轴对齐之后会覆盖y轴的 [max, min, interval, axisLabel.formatter] 属性
   * ```
   */
  alignAxis: {
    default: false
  },

  /**
   * ```
   * 双y轴的情况下最大值最小值距离上下边界的距离
   * 不用两个轴都写
   * 取值: 0~0.5
   * ```
   */
  alignPadding: {
    default: 0
  }
};

export default {
  /** @returns {import('Vue').VNode} */
  render(h) {
    return h('div', this.$slots.default);
  },
  mixins: [mixin, CartesianAxis],
  name: 'EcYAxis',
  props: { ...props },
  data() {
    const data = {
      /** @type {keyof Mixin['owner']['optionFrame']} */
      category: 'yaxis'
    };
    return /** @type {typeof data & CartesianAxis & OverrideMixin} */ (data);
  },
  methods: {
    /** @param {Mixin['owner']} owner */
    registerToOwner(owner) {
      if (!owner.optionFrame.yaxis.includes(this)) {
        owner.optionFrame.yaxis.push(this);
      }
    },
    unregisterFromOwner() {
      const index = this.owner?.optionFrame.yaxis.indexOf(this);
      if (index > -1) {
        this.owner.optionFrame.yaxis.splice(index, 1);
      }
    },
    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      /** @type {echarts.EChartOption.YAxis[]}  */
      const yAxis = [];
      this.owner.optionFrame.yaxis.forEach((/** @type {typeof this} */ v) => {
        yAxis.push(v.generateOption());
      });
      return {
        yAxis
      };
    }
  }
};
</script>
