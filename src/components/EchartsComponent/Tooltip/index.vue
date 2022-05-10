<script>
// @ts-check
import mixin from '../mixins/extend.vue';

/**
 * @typedef {import('echarts').EChartOption.Tooltip} TooltipOption
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {{
 *  generateOption (): TooltipOption
 * }} OverrideProperty
 * @typedef {Omit<Mixin, keyof OverrideProperty> & OverrideProperty} OverrideMixin
 */
/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */

export default {
  mixins: [mixin],
  name: 'EcLegend',

  props: {
    /** @type {PropOptions<TooltipOption['position']>} */
    position: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['formatter']>} */
    formatter: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['backgroundColor']>} */
    backgroundColor: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['borderColor']>} */
    borderColor: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['borderWidth']>} */
    borderWidth: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['padding']>} */
    padding: {
      default: () => [6, 9]
    },

    /** @type {PropOptions<TooltipOption['textStyle']>} */
    textStyle: {
      default: () => ({
        fontSize: 12,
        lineHeight: 24,
        width: 60,
        overflow: 'truncate',
        ellipsis: '...'
      })
    },

    /** @type {PropOptions<TooltipOption['extraCssText']>} */
    extraCssText: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['show']>} */
    show: {
      default: true
    },

    /** @type {PropOptions<TooltipOption['trigger']>} */
    trigger: {
      default: 'axis'
    },

    /** @type {PropOptions<TooltipOption['axisPointer']>} */
    axisPointer: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['showContent']>} */
    showContent: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['alwaysShowContent']>} */
    alwaysShowContent: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['triggerOn']>} */
    triggerOn: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['showDelay']>} */
    showDelay: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['hideDelay']>} */
    hideDelay: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['enterable']>} */
    enterable: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['renderMode']>} */
    renderMode: {
      default: undefined
    },

    /** @type {PropOptions<TooltipOption['confine']>} */
    confine: {
      default: false
    },

    /** @type {PropOptions<TooltipOption['transitionDuration']>} */
    transitionDuration: {
      default: undefined
    },

    /** @type {PropOptions<number>} */
    borderRadius: {
      default: 2
    },

    /**
     * 是否将 tooltip 的 DOM 节点添加为 HTML 的 <body> 的子节点。只有当 renderMode 为 'html' 是有意义的。
     *
     * 默认值是 false。false 表示，tooltip 的 DOM 节点会被添加为本图表的 DOM container 的一个子孙节点。但是这种
     * 方式导致，如果本图表的 DOM container 的祖先节点有设置 overflow: hidden，那么当 tooltip 超出 container
     * 范围使可能被截断。这个问题一定程度上可以用 tooltip.confine 来解决，但是不一定能解决所有场景。
     *
     * 所以这里我们提供了 appendToBody: true 来解决这件事。这也是常见的解决此类问题的一种方式。但是 true 并不定为
     * 默认值，因为要避免 break change，尤其是一些对于 tooltip 深入定制的使用。并且也避免一些未知的 bad case。
     *
     * 注：CSS transform 的场景，这也可以使用。
     */
    appendToBody: {
      default: true
    },

    /** @type {PropOptions<any>} */
    textFormatter: {
      default: undefined
    }
  },

  render() {
    return null;
  },

  data() {
    const data = {
      /** @type {keyof Mixin['owner']['optionFrame']} */
      category: 'tooltip'
    };
    return /** @type {typeof data & OverrideMixin} */ (data);
  },
  methods: {
    /** @param {Mixin['owner']} owner */
    registerToOwner(owner) {
      owner.optionFrame.tooltip = this;
    },
    unregisterFromOwner() {
      if (this.owner?.optionFrame) {
        this.owner.optionFrame.tooltip = null;
      }
    },

    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      if (this.isDestroyed) {
        return {
          tooltip: { show: false }
        };
      }
      return {
        tooltip: this.generateOption()
      };
    }
  }
};
</script>
