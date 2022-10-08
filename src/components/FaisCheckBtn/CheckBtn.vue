<template>
  <div
    class="fais-check-btn"
    :class="{
      'f-cur-p': !innerDisabled && !innerReadonly,
      'fais-check-btn__checked': checked,
      'fais-check-btn__disabled': innerDisabled,
      'fais-check-btn__readonly': innerReadonly,
      ['fais-check-btn__' + innerSize]: true,
      ['fais-check-btn__' + innerType]: true
    }"
    :tabindex="innerTabindex"
    @click="onCheckBtnClick"
    @focus="onFocus"
    @blur="onBlur"
    @keydown.enter="onCheckBtnClick"
    @keydown.space="onCheckBtnClick"
  >
    <h-icon
      v-if="checked"
      class="fais-check-btn-icon"
      :name="innerIcon"
    ></h-icon>
    <slot></slot>
  </div>
</template>

<script>
import { handleTrack } from '@fais/tzjc-comps/track/util';
import './style.scss';

/**
 * @param {any} parent
 * @param {string} key
 */
function getInnerValue(parent, key) {
  if (!parent || parent[key] === undefined || parent[key] === '') {
    return this[key];
  } else {
    return parent[key];
  }
}

export default {
  name: 'FaisCheckBtn',
  props: {
    trackIdPrefix: {
      type: String,
      default: undefined
    },
    /** tabindex>=0 时可以通过 tab 来 focus */
    tabindex: {
      type: Number,
      default: undefined
    },
    /** v-model 值, 会根据 trueValue 来变化 */
    value: {
      default: undefined
    },
    /**
     * @type {Vue.PropOptions<string|number|boolean>}
     * 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    /**
     * @type {Vue.PropOptions<string|number|boolean>}
     * 未选时的值，当使用类似 1 和 0 来判断是否选中时会很有用
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    /** 是否只读,查看模式使用 */
    readonly: {
      type: Boolean,
      default: false
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * @type {Vue.PropOptions<'info'|'success'|'warning'|'danger'>}
     * CheckBtn组件的颜色
     */
    type: {
      default: 'info'
    },
    /**
     * @type {Vue.PropOptions<string>}
     * 右上角的图标
     */
    icon: {
      type: String,
      default: 'right'
    },
    /**
     * @type {Vue.PropOptions<'small'|'large'>}
     * CheckBtn组件的尺寸
     */
    size: {
      default: 'small'
    },
    /**
     * 当 value 不为 trueValue 或 falseValue 的时候，是否会触发 input 事件 (返回 falseValue)
     */
    emitUnknownValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * 组件实际的icon
     * group有icon属性则使用group的
     * 否则用自己的配置
     * @private
     * @returns {'small'|'large'}
     */
    innerIcon() {
      return getInnerValue.call(this, this.groupComp, 'icon');
    },
    /**
     * 组件实际的size
     * group有size属性则使用group的
     * 否则用自己的配置
     * @private
     * @returns {'small'|'large'}
     */
    innerSize() {
      return getInnerValue.call(this, this.groupComp, 'size');
    },
    /**
     * 组件实际的type
     * group有type属性则使用group的
     * 否则用自己的配置
     * @private
     * @returns {'info'|'success'|'warning'|'danger'}
     */
    innerType() {
      return getInnerValue.call(this, this.groupComp, 'type');
    },
    /**
     * 组件是否只读
     * group有readonly属性则使用group的
     * 否则用自己的配置
     * @private
     * @returns {boolean}
     */
    innerReadonly() {
      return !!getInnerValue.call(this, this.groupComp, 'readonly');
    },
    /**
     * 组件是否禁用
     * group有disabled属性则使用group的
     * 否则用自己的配置
     * @private
     * @returns {boolean}
     */
    innerDisabled() {
      return !!getInnerValue.call(this, this.groupComp, 'disabled');
    },
    /**
     * 组件的tabindex
     * 只读和禁用状态为-1
     * @private
     * @returns {number}
     */
    innerTabindex() {
      if (this.innerReadonly || this.innerDisabled) {
        return undefined;
      } else {
        return getInnerValue.call(this, this.groupComp, 'tabindex');
      }
    }
  },
  watch: {
    value: {
      handler(n) {
        if (n === this.trueValue) {
          this.checked = true;
        } else if (n === this.falseValue) {
          this.checked = false;
        } else {
          /**
           * 如果value不等于trueValue或falseValue
           * 则认为是未选中
           */
          this.checked = false;
          /**
           * 如果此时emitUnknownValue为true
           * 则在初始化时, 会emit falseValue
           */
          if (this.emitUnknownValue) {
            this.emitInput(this.falseValue);
          }
        }
      },
      immediate: true
    }
  },
  data() {
    const data = {
      /** 是否选中 */
      checked: false,
      /** 父组件(FaisCheckBtnGroup) */
      groupComp: null
    };
    return data;
  },
  methods: {
    /** 选中的回调 */
    onCheckBtnClick() {
      if (this.innerReadonly || this.innerDisabled) {
        return;
      }
      this.checked = !this.checked;
      this.emitInput(this.checked ? this.trueValue : this.falseValue);
    },

    /** focus的回调 */
    onFocus() {
      this.$emit('on-focus');
    },

    /** blur的回调 */
    onBlur() {
      this.$emit('on-blur');
    },

    /** @param {string | number | boolean} value */
    emitInput(value) {
      if (this.trackIdPrefix && !this.groupComp) {
        handleTrack(this.trackIdPrefix + '.FaisCheckBtn');
      }
      this.$emit('input', value);
      this.$emit('on-change', value);
    }
  },
  created() {
    const parent =
      /** @type {InstanceType<import('./CheckBtnGroup.vue')['default']>} */ (
        this.$parent
      );
    /** 找一找有没有父组件 */
    if (parent.$options.name === 'FaisCheckBtnGroup') {
      this.groupComp = parent;
      /**
       * 如果找到了 就给自己绑定input,focus,blur的事件,
       * 触发时调用父组件的对应方法
       */
      this.$on('input', () => parent.onChildrenInput(this));
      this.$on('on-focus', () => parent.onChildrenFocus(this));
      this.$on('on-blur', () => parent.onChildrenBlur(this));
      if (this.falseValue !== false) {
        console.error('faisCheckBtn: 嵌套使用时，请不要设置「falseValue」的值');
      }
      this.$nextTick(() => {
        parent.childrenMounted = true;
        /** 访问一下children的值, 用来调用computed方法 */
        isNaN(parent.children?.length);
      });
    }
  }
};
</script>
