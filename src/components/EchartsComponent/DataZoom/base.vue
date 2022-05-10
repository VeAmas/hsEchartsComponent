<script>
// @ts-check
import mixin from '../mixins/extend.vue';
import { mergeChainingProps } from '../utils';

/**
 * @typedef {import('echarts').EChartOption.DataZoom} DataZoomOption
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {{
 *  generateOption (): DataZoomOption
 * }} OverrideProperty
 * @typedef {Omit<Mixin, keyof OverrideProperty> & OverrideProperty} OverrideMixin
 */
/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */

export default {
  mixins: [mixin],
  data() {
    const data = {
      /** @type {keyof Mixin['owner']['optionFrame']} */
      category: 'datazoom'
    };
    return /** @type {typeof data & OverrideMixin} */ (data);
  },
  methods: {
    /** @param {Mixin['owner']} owner */
    registerToOwner(owner) {
      if (!owner.optionFrame.datazoom.includes(this)) {
        owner.optionFrame.datazoom.push(this);
      }
    },
    unregisterFromOwner() {
      const index = this.owner?.optionFrame.datazoom.indexOf(this);
      if (index > -1) {
        this.owner.optionFrame.datazoom.splice(index, 1);
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
      mergeChainingProps(option);
      return option;
    },

    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      /** @type {echarts.EChartOption.DataZoom[]}  */
      const DataZoom = [];
      this.owner.optionFrame.datazoom.forEach(
        (/** @type {typeof this} */ v) => {
          DataZoom.push(v.generateOption());
        }
      );
      if (DataZoom.length === 0) {
        DataZoom.push({
          show: false,
          disabled: true
        });
        DataZoom.push({
          show: false,
          disabled: true
        });
      }
      return {
        dataZoom: DataZoom.length === 0 ? null : DataZoom
      };
    }
  }
};
</script>
