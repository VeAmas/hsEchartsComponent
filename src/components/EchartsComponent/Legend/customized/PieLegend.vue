<script>
import EcLegend from '../index.vue';
import echarts from 'echarts';

/**
 * @typedef {typeof EcLegend} EcLegend
 * @typedef {import('echarts').EChartOption.Legend} LegendOption
 */

/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */

/** @type {import('../index.vue')['props']} */
// @ts-ignore
const ecLegendProps = {};

export const props = {
  ...ecLegendProps,

  /** @type {PropOptions<LegendOption['orient']>} */
  orient: {
    default: 'vertical'
  },

  /** @type {PropOptions<LegendOption['tooltip']>} */
  tooltip: {
    default: () => ({
      show: true
    })
  },

  /** @type {PropOptions<LegendOption['selectedMode']>} */
  selectedMode: {
    default: false
  },

  /** @type {PropOptions<LegendOption['left']>} */
  left: {
    default: undefined
  },

  /** @type {PropOptions<LegendOption['right']>} */
  right: {
    default: 10
  },

  /** @type {PropOptions<LegendOption['top']>} */
  top: {
    default: 'middle'
  },

  /** @type {PropOptions<LegendOption['itemGap']>} */
  itemGap: {
    default: 10
  },

  /** @type {PropOptions<LegendOption['itemWidth']>} */
  itemWidth: {
    default: 10
  },

  /** @type {PropOptions<LegendOption['itemHeight']>} */
  itemHeight: {
    default: 10
  },

  /** @type {PropOptions<LegendOption['icon']>} */
  icon: {
    default: 'circle'
  },

  /** @type {PropOptions<LegendOption['textStyle']>} */
  textStyle: {
    default: () => ({
      fontSize: 12,
      padding: [2, 0, 0, 0]
    })
  },

  /** @type {PropOptions<LegendOption['formatter']>} */
  formatter: {
    default() {
      /** @type {any} */
      const that = this;
      return function (text) {
        /** @type {InstanceType<import('../../main.vue')['default']>} */
        const owner = that.owner;
        /** @type {InstanceType<import('../../Series/Pie.vue')['default']>[]} */
        const pieSeries = owner?.optionFrame.series.filter(
          v => v.type === 'pie'
        );

        if (pieSeries.length === 0) {
          return that.textFormatter(text);
        } else {
          const el = /** @type {HTMLDivElement} */ (owner.$el);

          /**
           * @param {string | number} value
           * @param { number} total
           */
          const getRealValueOfWidth = (value, total) => {
            if (typeof value === 'string' && /%/.test(value)) {
              return (total * parseFloat(value)) / 100;
            } else {
              return parseFloat(String(value));
            }
          };

          const rightWidth = pieSeries.reduce((o, n) => {
            /** @type {string | number} */
            const centerX = n.center?.[0] ?? '50%';
            const centerXumber =
              el.offsetWidth - getRealValueOfWidth(centerX, el.offsetWidth);

            /** @type {string | number} */
            const radius = n.radius?.[1] ?? '75%';
            const radiusNumber = getRealValueOfWidth(
              radius,
              Math.min(el.offsetWidth, el.offsetHeight)
            );

            const right =
              centerXumber -
              radiusNumber / 2 -
              parseFloat(that.itemWidth) -
              getRealValueOfWidth(that.right || 0, el.offsetWidth) -
              10;
            return Math.min(o, right);
          }, Infinity);

          // @ts-ignore
          return echarts.format.truncateText(
            (that.textFormatter || (str => str))(text),
            rightWidth,
            '14px',
            '...'
          );
        }
      };
    }
  },

  /** @type {PropOptions<LegendOption['formatter']>} */
  textFormatter: {
    default: text => text
  }
};

export default {
  extends: EcLegend,
  props: {
    ...props
  },
  name: 'EcPieLegend',
  methods: {
    defaults() {}
  }
};
</script>
