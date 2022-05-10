<script>
import { measureText } from '../utils';
// @ts-check
import mixin from '../mixins/extend.vue';
import { barLegendIcon } from '../utils';
import { LEGEND_TOP } from '../constant';

/**
 * @typedef {import('echarts').EChartOption.Legend} LegendOption
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {{
 *  generateOption (): LegendOption
 * }} OverrideProperty
 * @typedef {Omit<Mixin, keyof OverrideProperty> & OverrideProperty} OverrideMixin
 */
/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */

export const props = {
  /** @type {PropOptions<LegendOption['type']>} */
  type: {
    default: 'scroll'
  },

  /** @type {PropOptions<LegendOption['id']>} */
  id: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['show']>} */
  show: {
    default: true
  },

  /** @type {PropOptions<LegendOption['zlevel']>} */
  zlevel: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['z']>} */
  z: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['left']>} */
  left: {
    default: 'center'
  },

  /** @type {PropOptions<LegendOption['top']>} */
  top: {
    default: LEGEND_TOP
  },

  /** @type {PropOptions<LegendOption['right']>} */
  right: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['bottom']>} */
  bottom: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['width']>} */
  width: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['height']>} */
  height: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['orient']>} */
  orient: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['align']>} */
  align: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['padding']>} */
  padding: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['itemGap']>} */
  itemGap: {
    default: 16
  },

  /** @type {PropOptions<LegendOption['itemWidth']>} */
  itemWidth: {
    default: 16
  },

  /** @type {PropOptions<LegendOption['itemHeight']>} */
  itemHeight: {
    default: 16
  },

  /** @type {PropOptions<LegendOption['symbolKeepAspect']>} */
  symbolKeepAspect: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['formatter']>} */
  formatter: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['selectedMode']>} */
  selectedMode: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['inactiveColor']>} */
  inactiveColor: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['selected']>} */
  selected: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['textStyle']>} */
  textStyle: {
    default: () => ({
      fontSize: 12
    })
  },

  /** @type {PropOptions<LegendOption['tooltip']>} */
  tooltip: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['icon']>} */
  icon: {
    default: barLegendIcon
  },

  /** @type {PropOptions<LegendOption['data']>} */
  data: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['backgroundColor']>} */
  backgroundColor: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['borderColor']>} */
  borderColor: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['borderWidth']>} */
  borderWidth: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['borderRadius']>} */
  borderRadius: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['shadowBlur']>} */
  shadowBlur: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['shadowColor']>} */
  shadowColor: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['shadowOffsetX']>} */
  shadowOffsetX: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['shadowOffsetY']>} */
  shadowOffsetY: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['scrollDataIndex']>} */
  scrollDataIndex: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageButtonItemGap']>} */
  pageButtonItemGap: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageButtonGap']>} */
  pageButtonGap: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageButtonPosition']>} */
  pageButtonPosition: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageFormatter']>} */
  pageFormatter: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageIcons']>} */
  pageIcons: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageIconColor']>} */
  pageIconColor: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageIconInactiveColor']>} */
  pageIconInactiveColor: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['pageIconSize']>} */
  pageIconSize: {
    default: 12
  },

  /** @type {PropOptions<LegendOption['pageTextStyle']>} */
  pageTextStyle: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['animation']>} */
  animation: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['animationDurationUpdate']>} */
  animationDurationUpdate: {
    default: undefined
  },

  /** @type {PropOptions<any>} */
  selectorLabel: {
    default: () => ({
      verticalAlign: 'middle'
    })
  },

  /** 是否自动设置Legend的Data属性, 如果已经有data属性则无效 */
  autoSetData: {
    default: true
  },

  avoidOverlap: {
    default: false
  }
};

/** @returns {{legendWidth: number, nameWidth: number[]}} */
export const calcLeftValueToAvoidOverlap = ({
  itemGap = 16,
  itemWidth = 16,
  padding = 5,
  textStyle = { fontSize: 12 },
  formatter = text => text,
  names = [],
  yNames = []
}) => {
  const width =
    names.reduce((ret, next) => {
      const width =
        measureText(formatter(next), textStyle.fontSize + 'px 微软雅黑') +
        itemWidth +
        5 +
        itemGap;
      return ret + width;
    }, 0) +
    padding * 2 -
    itemGap;

  if (yNames.length === 0) {
    return { legendWidth: 0, nameWidth: [] };
  }
  /** NOTE: 这里写死了fontSize */
  const maxYNames = yNames.map(v => measureText(v, '12px 微软雅黑') + 12);
  return { legendWidth: width, nameWidth: maxYNames };
};

export default {
  mixins: [mixin],
  name: 'EcLegend',

  props: { ...props },
  render() {
    return null;
  },

  data() {
    const data = {
      /** @type {keyof Mixin['owner']['optionFrame']} */
      category: 'legend',
      /** @type {number[]} */
      leftValueToAvoidOverlap: [],
      reactiveKeys: ['leftValueToAvoidOverlap']
    };
    return /** @type {typeof data & OverrideMixin} */ (data);
  },
  methods: {
    onResize() {
      if (!this.avoidOverlap) {
        this.leftValueToAvoidOverlap = [];
        return;
      }

      const legend = this.owner.chartInstance
        // @ts-ignore
        .getModel()
        ?.getComponent('legend');
      if (!legend) {
        return;
      }

      const yAxes = this.owner.optionFrame.yaxis;
      const yNames = yAxes
        ?.slice()
        .sort((a, b) => (a.yAxisIndex || 0) - (b.yAxisIndex || 0))
        .map(v => v.name)
        .filter(v => v);

      const { legendWidth, nameWidth } = calcLeftValueToAvoidOverlap({
        ...legend.option,
        names: legend._availableNames,
        yNames
      });

      this.leftValueToAvoidOverlap =
        // @ts-ignore
        this.owner.$el.offsetWidth / 2 -
          Math.max.apply(0, nameWidth) -
          legendWidth / 2 <
        0
          ? nameWidth
          : [];
    },

    /** @param {Mixin['owner']} owner */
    registerToOwner(owner) {
      owner.optionFrame.legend = this;
    },
    unregisterFromOwner() {
      if (this.owner?.optionFrame) {
        this.owner.optionFrame.legend = null;
      }
    },

    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      if (this.isDestroyed) {
        return {
          legend: { show: false }
        };
      }
      return {
        legend: this.generateOption()
      };
    }
  },
  mounted() {
    this.owner.$on('on-resize', this.onResize);
  }
};
</script>
