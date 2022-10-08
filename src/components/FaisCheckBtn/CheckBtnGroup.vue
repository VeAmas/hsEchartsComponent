<template>
  <div class="fais-check-btn-group f-dib">
    <CheckBtn
      v-if="needLeader && leaderPlacement !== 'end'"
      ref="leader"
      :trueValue="leaderValue"
      :disabled="disabled"
      :readonly="readonly"
      :tabindex="tabindex"
      :type="type"
      :icon="icon"
      :size="size"
    >
      {{ leaderText }}
    </CheckBtn>

    <template v-if="options">
      <CheckBtn
        v-for="(item, index) in options"
        ref="checkBtns"
        :key="index"
        :trueValue="item.value"
        :disabled="disabled || item.disabled"
        :readonly="readonly"
      >
        {{ item.label }}
      </CheckBtn>
    </template>
    <slot v-else></slot>

    <CheckBtn
      v-if="needLeader && leaderPlacement === 'end'"
      ref="leader"
      :trueValue="leaderValue"
      :disabled="disabled"
      :readonly="readonly"
      :tabindex="tabindex"
      :type="type"
      :icon="icon"
      :size="size"
    >
      {{ leaderText }}
    </CheckBtn>
  </div>
</template>

<script>
import { handleTrack } from '@fais/tzjc-comps/track/util';
import CheckBtn from './CheckBtn.vue';

/**
 * @typedef {{label: string; value: string | number; disabled?: boolean}} Option
 * @typedef {InstanceType<typeof CheckBtn>} CheckBtn
 * @typedef {{$refs: {
 *  checkBtns?: CheckBtn[]
 *  leader?: CheckBtn
 * }}} $refs
 */

export default {
  name: 'FaisCheckBtnGroup',
  components: { CheckBtn },
  props: {
    trackIdPrefix: {
      type: String,
      default: undefined
    },
    /** 是否只读,查看模式使用, group只读则子组件强制只读 */
    readonly: {
      type: Boolean,
      default: undefined
    },
    /** 是否禁用, group禁用则子组件强制禁用 */
    disabled: {
      type: Boolean,
      default: undefined
    },
    /** tabindex>=0 时可以通过 tab 来 focus */
    tabindex: {
      type: Number,
      default: undefined
    },
    /**
     * @type {Vue.PropOptions<string[] | number[] | string>}
     * v-model 值, isString 时为 string 类型
     */
    value: {
      default: undefined
    },
    /** 是否显示最左侧的「不限」按钮 */
    needLeader: {
      type: Boolean,
      default: false
    },
    /**
     * @type {Vue.PropOptions<string | number>}
     * 「不限」按钮被选中时的值
     */
    leaderValue: {
      default: undefined
    },
    /** 「不限」按钮的文字 */
    leaderText: {
      type: String,
      default: '不限'
    },
    /**
     * @type {Vue.PropOptions<'exclusive' | 'strictly'>}
     * 「不限」按钮的操作逻辑
     */
    leaderType: {
      default: 'exclusive'
    },
    /** 'exclusive'模式下,「不限」按钮的是否可以取消选中 (leaderValue 不能为空) */
    leaderCanUncheck: {
      type: Boolean,
      default: false
    },
    /**
     * @type {Vue.PropOptions< 'start' | 'end' >}
     * 「不限」按钮的位置
     */
    leaderPlacement: {
      default: 'start'
    },
    /** 「不限」按钮重复点击时是否会触发@input 和@on-change */
    reclickTrigger: {
      type: Boolean,
      default: false
    },
    /**
     * @type {Vue.PropOptions<'info'|'success'|'warning'|'danger'>}
     * CheckBtn组件的颜色
     */
    type: {
      default: undefined
    },
    /**
     * @type {Vue.PropOptions<string>}
     * 右上角的图标
     */
    icon: {
      type: String,
      default: undefined
    },
    /**
     * @type {Vue.PropOptions<Option[]>}
     * 内部的子组件数组 这个值不为空时会忽略 slot。
     * * label:子组件文字
     * * value: 选中时的值
     * * disabled: 是否禁用
     */
    options: {
      default: undefined
    },
    /**
     * @type {Vue.PropOptions<'small'|'large'>}
     * CheckBtn组件的尺寸
     */
    size: {
      default: undefined
    },
    /**
     * 将多选时双向绑定的变量的格式变为string类型，多个选项用','隔开
     */
    isString: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      /** @type {Map<string | number | boolean, boolean>} 内部值 */
      innerValue: new Map(),
      /** 子组件是否mount */
      childrenMounted: false
    };
    return /** @type {$refs & typeof data} */ (data);
  },
  computed: {
    /** @returns {CheckBtn[]} */
    children() {
      /** 如果子组件没有mounte 则直接返回[] */
      if (!this.childrenMounted) {
        return [];
      }
      /** 筛选出「除了leader」之外的子组件 */
      const children = (
        this.$refs.checkBtns ?? /** @type {CheckBtn[]} */ (this.$children)
      ).filter(v => v !== this.$refs.leader);

      /** 如果trueValue存在重复 */
      if (
        [...new Set(children.map(v => v.trueValue))].length < children.length
      ) {
        console.error(
          'FaisCheckBtnGroup下的FaisCheckBtn的trueValue存在重复，请检查！'
        );
      }
      /** 如果isString时 trueValue在转化成string后存在重复 */
      if (
        this.isString &&
        [...new Set(children.map(v => String(v.trueValue)))].length <
          children.length
      ) {
        console.error(
          'FaisCheckBtnGroup在isString为true时，其中的FaisCheckBtn的trueValue在隐式转化为string类型后，存在重复！'
        );
      }

      /** 初始化innerValue 都初始化为false */
      children.forEach(v => {
        if (!this.innerValue.get(this.getTrueValue(v.trueValue))) {
          this.innerValue.set(this.getTrueValue(v.trueValue), false);
        }
      });
      return children;
    }
  },
  watch: {
    /** 当children数组发生变化时, 需要更新子组件的选中状态 */
    children() {
      this.onValueChanged(this.value);
    },
    value: {
      handler(n) {
        this.onValueChanged(n);
      },
      immediate: true
    },
    /** 校验leaderValue是否合法 */
    leaderValue: {
      handler(n) {
        if (this.isString && n && typeof n !== 'string') {
          console.error(
            'FaisCheckBtnGroup在isString为true时，leaderValue的类型必须为string'
          );
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * value发生变动时的回调函数
     * @param {string | (number|string)[]} n
     */
    onValueChanged(n) {
      /** @type {Map<string | number | boolean, CheckBtn>} */
      const childrenMap = new Map();
      this.children.forEach(v =>
        childrenMap.set(this.getTrueValue(v.trueValue), v)
      );

      /** 把所有的值都设置为false */
      this.children.forEach(v => {
        v.checked = false;
      });
      this.innerValue.forEach((v, key) => {
        this.innerValue.set(key, false);
      });

      if (!n) {
        return;
      }
      let list = [];
      /** 把innerValue转化为字符串 */
      if (this.isString) {
        if (typeof n === 'string') {
          list = n.split(',');
        } else {
          console.error(
            'FaisCheckBtnGroup的isString为true时，请确保value为字符串。'
          );
          list = n;
        }
      } else {
        if (typeof n === 'string') {
          list = n.split(',');
          console.error(
            'FaisCheckBtnGroup的isString为false时，请确保value不为字符串。'
          );
        } else {
          list = n;
        }
      }

      /** 把子组件的checked值赋值给innerValue */
      list.forEach(v => {
        const comp = childrenMap.get(v);
        if (comp) {
          comp.checked = true;
          this.innerValue.set(v, true);
        }
      });
      /** 更新leader的值 */
      this.updateLeaderValue(true);
    },

    /**
     * 获取当前组件的trueValue 当isString为true的时候 则返回字符串
     * @param {string | number | boolean} v
     */
    getTrueValue(v) {
      return this.isString ? String(v) : v;
    },

    /**
     * 更新leader的值
     * @param {boolean} [isByValueChange] 是否是因为value变化触发
     */
    updateLeaderValue(isByValueChange) {
      if (this.needLeader && this.$refs.leader) {
        if (this.leaderType === 'exclusive') {
          /**
           * 如果是改变group的值导致触发的话
           * 要判断value中是否有leaderValue
           */
          if (isByValueChange && this.leaderValue) {
            /** @type {any[]} */
            let vlist = [];
            if (typeof this.value === 'string') {
              vlist = this.value?.split(',') ?? [];
            } else {
              vlist = this.value;
            }
            if (!vlist.includes(this.leaderValue)) {
              /** 如果没有leaderValue则leader需要设置为false */
              this.$refs.leader.checked = false;
              return;
            }
          }

          /**
           * exclusive时, 如果所有子组件都空选则选中
           */
          if (this.children.every(v => !v.checked)) {
            this.$refs.leader.checked = true;
          } else {
            this.$refs.leader.checked = false;
          }
        } else {
          /**
           * strictly时, 如果所有子组件都选中则选中
           */
          if (this.children.every(v => v.checked)) {
            this.$refs.leader.checked = true;
          } else {
            this.$refs.leader.checked = false;
          }
        }
      }
    },

    /**
     * 子组件触发input的时候的响应函数
     * @param {CheckBtn} comp
     */
    onChildrenInput(comp) {
      /** 点击的是leader时 */
      if (comp === this.$refs.leader) {
        if (this.leaderType === 'exclusive') {
          if (comp.checked) {
            this.innerValue.forEach((v, key) => {
              this.innerValue.set(key, false);
            });
          } else {
            /**
             * 如果leaderCanUncheck且leaderValue不为空
             * 则被选中的leader可以再点击一下变成不选中
             */
            if (this.leaderCanUncheck && this.leaderValue) {
              comp.checked = false;
            } else {
              comp.checked = true;
              /** 如果reclickTrigger则继续执行 (触发$emit) 否则就直接返回 */
              if (!this.reclickTrigger) {
                return;
              }
            }
          }

          /** strictly时 */
        } else {
          this.innerValue.forEach((v, key) => {
            this.innerValue.set(key, comp.checked);
          });
        }
      } else {
        /** 如果点击的不是leader 则更新对应的值 同时更新leader */
        this.innerValue.set(this.getTrueValue(comp.trueValue), comp.checked);
        this.updateLeaderValue();
      }
      this.emitInput();
    },

    /**
     * 子组件focus
     * @param {CheckBtn} comp
     */
    onChildrenFocus(comp) {
      this.$emit('on-focus', this.children.indexOf(comp));
    },

    /**
     * 子组件blur
     * @param {CheckBtn} comp
     */
    onChildrenBlur(comp) {
      this.$emit('on-blur', this.children.indexOf(comp));
    },

    /** 触发$emit */
    emitInput() {
      /** @type {(string | number | boolean)[]} */
      const checkList = [];
      this.innerValue.forEach((v, key) => {
        if (v) {
          checkList.push(key);
        }
      });

      /**
       * 如果有leader 且为'exclusive'状态 且leader选中 且leader有值
       * 则需要往结果里加一个 leaderValue
       */
      if (
        this.needLeader &&
        this.leaderType === 'exclusive' &&
        this.leaderValue &&
        this.$refs.leader?.checked
      ) {
        checkList.push(this.leaderValue);
      }

      /** isString的时候把结果用','join一下 */
      if (this.isString) {
        this.$emit('input', checkList.join(','));
        /** 用来触发hFormItem校验 */
        this.dispatch('FormItem', 'on-form-change', checkList.join(','));
      } else {
        this.$emit('input', checkList);
        this.dispatch('FormItem', 'on-form-change', checkList);
      }

      if (this.trackIdPrefix) {
        handleTrack(this.trackIdPrefix + '.FaisCheckBtn');
      }
    },

    /** h_ui抄来的 公共组件好像不会引用hui所以复制过来了 */
    dispatch(componentName, eventName, params, params1) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params).concat(params1));
      }
    }
  }
};
</script>
