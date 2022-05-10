<script>
// @ts-check
import mixin from '../mixins/extend.vue';
import { mergeChainingProps } from '../utils';

/**
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {import('echarts')} echarts
 */

export default {
  mixins: [mixin],
  name: 'Series',
  render(h) {
    return h('span', {
      attrs: {
        // @ts-ignore
        id: 'series_' + this._uid,
        style: 'display:none;'
      }
    });
  },
  data() {
    const data = {
      /** @type {keyof Mixin['owner']['optionFrame']} */
      category: 'series'
    };
    return /** @type {typeof data & Mixin} */ (data);
  },
  computed: {
    /**
     * 该Series是否没有数据
     * @returns {boolean}
     */
    noData() {
      return false;
    }
  },
  methods: {
    /** @param {Mixin['owner']} owner */
    registerToOwner(owner) {
      if (!owner.optionFrame.series.includes(this)) {
        owner.optionFrame.series.push(this);
      }
    },
    generateOption() {
      const option = {};
      if (this.$options.props) {
        for (const key in this.$options.props) {
          if (
            Object.hasOwnProperty.call(this.$options.props, key) &&
            this[key] !== undefined
          ) {
            option[key] = this[key];
          }
        }
      }
      option.type = this.type;

      const yaxis = this.chain.find(v => v.$options.name === 'EcYAxis');
      if (yaxis) {
        const index = this.owner.optionFrame.yaxis.indexOf(yaxis);
        if (index > -1) {
          option.yAxisIndex = index;
        }
      }
      mergeChainingProps(option);
      return option;
    },
    /**
     * 查找更新该组件是 需要联动更新的组件
     * @returns {Mixin[]}
     */
    findCollaborationCmps() {
      const list = [];
      this.owner.optionFrame.legend && list.push(this.owner.optionFrame.legend);
      return list;
    },
    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      /** @type {echarts.EChartOption.Series[]}  */
      const Series = [];
      const orderedUidList = [].map
        .call(
          this.owner.$el.querySelectorAll('[id*="series_"]'),
          v => v.id?.split('_')?.[1]
        )
        .filter(v => v);
      this.owner.optionFrame.series
        .sort(
          (a, b) =>
            orderedUidList.indexOf(String(a._uid)) - orderedUidList.indexOf(String(b._uid))
        )
        .forEach((/** @type {typeof this} */ v) => {
          Series.push(v.generateOption());
        });
      return {
        series: Series
      };
    },
    unregisterFromOwner() {
      const index = this.owner?.optionFrame.series.indexOf(this);
      if (index > -1) {
        this.owner.optionFrame.series.splice(index, 1);
      }
    }
  }
};
</script>
