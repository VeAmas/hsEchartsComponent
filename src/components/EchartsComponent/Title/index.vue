<script>
// @ts-check
import mixin from '../mixins/extend.vue';

/**
 * @typedef {import('echarts').EChartTitleOption} TitleOption
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {{
 *  generateOption (): TitleOption
 * }} OverrideProperty
 * @typedef {Omit<Mixin, keyof OverrideProperty> & OverrideProperty} OverrideMixin
 */
/**
 * @template T
 * @typedef {import('vue').PropOptions<T>} PropOptions<T>
 */

export default {
  mixins: [mixin],
  name: 'EcTitle',

  props: {
    /** @type {PropOptions<TitleOption['show']>} */
    show: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['text']>} */
    text: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['link']>} */
    link: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['target']>} */
    target: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['textStyle']>} */
    textStyle: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['subtext']>} */
    subtext: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['sublink']>} */
    sublink: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['subtarget']>} */
    subtarget: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['subtextStyle']>} */
    subtextStyle: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['textAlign']>} */
    textAlign: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['textVerticalAlign']>} */
    textVerticalAlign: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['triggerEvent']>} */
    triggerEvent: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['padding']>} */
    padding: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['itemGap']>} */
    itemGap: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['zlevel']>} */
    zlevel: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['z']>} */
    z: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['left']>} */
    left: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['top']>} */
    top: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['right']>} */
    right: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['bottom']>} */
    bottom: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['backgroundColor']>} */
    backgroundColor: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['borderColor']>} */
    borderColor: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['borderWidth']>} */
    borderWidth: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['borderRadius']>} */
    borderRadius: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['shadowBlur']>} */
    shadowBlur: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['shadowColor']>} */
    shadowColor: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['shadowOffsetX']>} */
    shadowOffsetX: {
      default: undefined
    },

    /** @type {PropOptions<TitleOption['shadowOffsetY']>} */
    shadowOffsetY: {
      default: undefined
    }
  },

  data() {
    const data = {
      /** @type {keyof Mixin['owner']['optionFrame']} */
      category: 'title'
    };
    return /** @type {typeof data & OverrideMixin} */ (data);
  },
  methods: {
    /** @param {Mixin['owner']} owner */
    registerToOwner(owner) {
      owner.optionFrame.title.push(this);
    },
    unregisterFromOwner() {
      if (this.owner?.optionFrame) {
        const index = this.owner.optionFrame.title?.indexOf(this) ?? -1;
        index > -1 && this.owner.optionFrame.title.splice(index, 1);
      }
    },

    /** @returns {echarts.EChartOption} */
    generateUpdateOption() {
      const Title = [];

      this.owner.optionFrame.title.forEach((/** @type {typeof this} */ v) => {
        Title.push(v.generateOption());
      });
      return {
        title: Title
      };
    }
  }
};
</script>
