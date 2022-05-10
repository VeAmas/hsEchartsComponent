<script>
import { cloneDeep } from '../utils';
import { mergeChainingProps } from '../utils';
// @ts-check
import base from './base.vue';
/**
 * @typedef {InstanceType<import('../main.vue')['default']>} Main
 * @typedef {InstanceType<typeof base>} Base
 */

export default {
  mixins: [base],
  data() {
    const data = {
      /** @type {Main} */
      owner: null,
      /** @type {keyof Main['optionFrame']} */
      category: null,
      isDestroyed: false,
      /** @type {Base[]} */
      chain: []
    };
    return /** @type {typeof data & Base} */ (data);
  },
  methods: {
    register() {
      /** @type {Base} */
      // @ts-ignore
      let p = this.$parent;
      const chain = [];
      while (p && p.$options.name !== 'EchartComponent') {
        if (p.isEchartsComponentPart) {
          chain.push(p);
        }
        // @ts-ignore
        p = p.$parent;
      }

      this.chain = chain;

      if (p) {
        // @ts-ignore
        this.owner = p;
        this.registerToOwner?.(p);
        this.owner.triggerUpdate(this);
      }
    },
    /**
     * 生成option
     */
    generateOption() {
      const option = {};
      if (this.$options.props) {
        for (const key in this.$options.props) {
          if (
            Object.hasOwnProperty.call(this.$options.props, key) &&
            this[key] !== undefined
          ) {
            option[key] = cloneDeep(this[key]);
          }
        }
      }
      this.reactiveKeys.forEach(v => {
        option[v] = cloneDeep(this[v]);
      });
      mergeChainingProps(option);
      return option;
    },
    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      return {};
    }
  },
  // updated() {
  //   this.owner.triggerUpdate(this);
  // },
  created() {
    if (this.$options.name !== 'EchartComponent') {
      this.register();
    }
  },
  destroyed() {
    this.isDestroyed = true;
    this.unregisterFromOwner?.();
    this.owner.triggerUpdate(this);
  }
};
</script>
