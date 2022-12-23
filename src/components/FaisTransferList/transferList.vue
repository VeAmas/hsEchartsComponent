<template>
  <div class="fais-transfer-list__content f-flex">
    <div
      class="fais-transfer-list__left-panel f-h100 theme-border-comp"
      :style="{
        width: parseFloat(listWidthLeft) + 'px',
        flexBasis: parseFloat(listWidthLeft) + 'px'
      }"
    >
      <div
        class="fais-transfer-list__title f-plr-8 f-flex-row theme-border-comp"
      >
        <div class="fais-transfer-list__checkbox f-flex-1 f-ov-h">
          <h-checkbox
            v-model="isLeftCheckAll"
            class="f-ellipsis f-w100 f-vt"
            @input="_checkAll('left', $event)"
          >
            <span
              v-if="typeof titles[0] === 'string'"
              :title="titles[0]"
              class="f-fw-700 f-vm"
              style="vertical-align: unset"
            >
              {{ titles[0] }}
            </span>
            <template v-else>
              <component :is="{ render: titles[0] }"></component>
            </template>
          </h-checkbox>
        </div>
        <span class="theme-text-desc">
          {{ leftCheckedNumFiltered ? leftCheckedNumFiltered + '/' : ''
          }}{{ leftData.length }}
        </span>
      </div>
      <div class="fais-transfer-list__list-wrapper f-ptb-8" :style="listStyle">
        <Search
          v-if="filterableLeft"
          v-model="leftKeyword"
          :icon="filterIconLeft"
          :placeholder="filterPlaceholderLeft"
          @on-search="_search('left')"
        ></Search>
        <List
          v-model="leftData"
          :style="{
            height: filterableLeft ? 'calc(100% - 32px)' : '100%'
          }"
          :direction="'left'"
          :dataFiltered="leftDataFiltered"
          :keyword="leftKeyword"
          :itemHeight="itemHeightLeft"
          :keeps="leftKeeps"
          :type="typeLeft"
          :checkedObj="leftCheckedObj"
          :renderFormat="renderFormatLeft"
          :showTitle="showTitleLeft"
          :renderTitle="renderTitleLeft"
          :draggable="draggableLeft"
          :dragIcon="dragIconLeft"
          :alwaysShowHandle="alwaysShowHandleLeft"
          @input="$emit('on-left-drag', $event)"
          @on-double-click="
            $emit('on-double-click', { item: $event, direcPanel: 'left' })
          "
        ></List>
      </div>
    </div>
    <div class="fais-transfer-list__middle-panel f-h100 f-flex-row f-p-6">
      <slot :scope="this" name="btns">
        <div class="fais-transfer-list__btn-wrapper">
          <h-button
            v-for="(item, index) in btns"
            :key="index"
            class="f-db fais-transfer-list__btn"
            :disabled="
              (function () {
                return {
                  left: !canMoveLeft,
                  right: !canMoveRigth
                }[item];
              })()
            "
            @click="btnMethodMap[item]"
          >
            <span v-if="operations[index]">{{ operations[index] }}</span>
            <h-icon v-else :name="btnIconMap[item]"></h-icon>
          </h-button>
        </div>
      </slot>
    </div>
    <div
      class="fais-transfer-list__right-panel f-h100 theme-border-comp"
      :style="{
        width: parseFloat(listWidthRight) + 'px',
        flexBasis: parseFloat(listWidthRight) + 'px'
      }"
    >
      <div
        class="fais-transfer-list__title f-plr-8 f-flex-row theme-border-comp"
      >
        <div class="fais-transfer-list__checkbox f-flex-1 f-ov-h">
          <h-checkbox
            v-model="isRightCheckAll"
            class="f-ellipsis f-w100 f-vt"
            @input="_checkAll('right', $event)"
          >
            <span
              v-if="typeof titles[1] === 'string'"
              :title="titles[1]"
              class="f-fw-700 f-vm"
              style="vertical-align: unset"
            >
              {{ titles[1] }}
            </span>
            <template v-else>
              <component :is="{ render: titles[1] }"></component>
            </template>
          </h-checkbox>
        </div>
        <span class="theme-text-desc">
          {{ rightCheckedNumFiltered ? rightCheckedNumFiltered + '/' : ''
          }}{{ rightData.length }}
        </span>
      </div>
      <div class="fais-transfer-list__list-wrapper f-ptb-8" :style="listStyle">
        <Search
          v-if="filterableRight"
          v-model="rightKeyword"
          :icon="filterIconRight"
          :placeholder="filterPlaceholderRight"
          @on-search="_search('right')"
        ></Search>
        <List
          v-model="rightData"
          :style="{
            height: filterableRight ? 'calc(100% - 32px)' : '100%'
          }"
          :direction="'right'"
          :dataFiltered="rightDataFiltered"
          :keyword="rightKeyword"
          :itemHeight="itemHeightRight"
          :keeps="rightKeeps"
          :type="typeRight"
          :checkedObj="rightCheckedObj"
          :renderFormat="renderFormatRight"
          :showTitle="showTitleRight"
          :renderTitle="renderTitleRight"
          :draggable="draggableRight"
          :dragIcon="dragIconRight"
          :alwaysShowHandle="alwaysShowHandleRight"
          @input="$emit('on-right-drag', $event)"
          @on-double-click="
            $emit('on-double-click', { item: $event, direcPanel: 'right' })
          "
        ></List>
      </div>
    </div>
  </div>
</template>

<script>
import './style.less';
import Search from './search.vue';
import List from './list.vue';

export const DISABLED_PROP = 'disabled';

/**
 * @param {string} name
 * @param {any} defaultValue
 */
const splitProps = (name, defaultValue) => {
  return {
    [name + 'Left']() {
      return (
        (Array.isArray(this[name]) ? this[name][0] : this[name]) ?? defaultValue
      );
    },
    [name + 'Right']() {
      return (
        (Array.isArray(this[name]) ? this[name][1] : this[name]) ?? defaultValue
      );
    }
  };
};

export default {
  components: { Search, List },
  props: {
    /**
     * 控制内容部分展示成列表还是表格
     * @type {Vue.PropOptions<'list' | 'table' | ('list' | 'table')[]>}
     */
    type: {
      default: 'list',
      validator(i) {
        return Array.isArray(i) || ['list', 'table'].includes(i);
      }
    },
    /**
     * 控制列表每一项的高度
     * @type {Vue.PropOptions<number | number[]>}
     */
    itemHeight: {
      default: 24,
      validator(i) {
        // @ts-ignore
        return Array.isArray(i) || parseInt(i, 10) > 0;
      }
    },
    /**
     * 作为 key 的字段
     */
    keyProp: {
      default: 'key'
    },
    /**
     * 作为 label 的字段
     */
    titleProp: {
      default: 'label'
    },
    /**
     * 列表宽度
     * 当在抽屉中使用时，这个值会作为 flex-basis 使用，实际宽度由抽屉宽度决定。
     */
    listWidth: {
      default: 180
    },
    /**
     * 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。
     * @type {Vue.PropOptions<any[]>}
     */
    data: {
      default: () => []
    },

    /**
     * 显示在右侧框数据的key 集合
     * @type {Vue.PropOptions<(string | number)[]>}
     */
    targetKeys: {
      default: () => []
    },

    /**
     * 每行数据渲染函数，该函数的入参为 data 中的项
     * @typedef {(h: Vue.CreateElement, data: any, index: number) => Vue.VNode} RenderFormat
     * @type {Vue.PropOptions<RenderFormat | RenderFormat[]>}
     */
    renderFormat: {
      default: undefined
    },

    /**
     * 设置哪些项应该被选中
     * @type {Vue.PropOptions<(string | number)[]>}
     */
    selectedKeys: {
      default: () => []
    },

    /**
     * 两个穿梭框的自定义样式
     */
    listStyle: {
      default: () => ({})
    },

    /**
     * 标题集合，顺序从左至右  (可以是 render 函数)
     */
    titles: {
      default: () => ['源列表', '目标列表'],
      validator(i) {
        return !i || Array.isArray(i);
      }
    },

    /**
     * 中间按钮的组合顺序(从上至下)
     * (right: 选中项右移, left: 选中项左移, rightAll: 全部右移, leftAll: 全部左移)
     * @type {Vue.PropOptions<('right' | 'left' | 'rightAll' | 'leftAll')[]>}
     */
    btns: {
      default: () => ['right', 'left', 'rightAll', 'leftAll'],
      validator(i) {
        if (!i) {
          return true;
        }
        return i.every(v =>
          ['right', 'left', 'rightAll', 'leftAll'].includes(v)
        );
      }
    },

    /**
     * 操作文案集合，顺序与 btns 属性一致
     */
    operations: {
      default: () => [],
      validator(i) {
        return !i || Array.isArray(i);
      }
    },

    /**
     * 是否显示搜索框
     * @type {Vue.PropOptions<boolean | boolean[]>}
     */
    filterable: {
      default: false,
      type: Boolean
    },

    /**
     * 搜索框的占位
     * @type {Vue.PropOptions<string | string[]>}
     */
    filterPlaceholder: {
      default: () => '请输入搜索内容'
    },

    /**
     * 搜索框的按钮图标
     * @type {Vue.PropOptions<string | string[]>}
     */
    filterIcon: {
      default: () => 'search'
    },

    /**
     * 自定义搜索函数，入参为 data 和 query，data 为项，query 为当前输入的搜索词
     * @typedef {(data: any, query: string) => boolean} FilterMethod
     * @type {Vue.PropOptions<FilterMethod | FilterMethod[]>}
     */
    filterMethod: {
      default: undefined
    },

    /**
     * 当搜索为空时显示的内容
     * @type {Vue.PropOptions<string | string[]>}
     */
    notFoundText: {
      default: '无匹配内容'
    },

    /**
     * 当列表为空时显示的内容
     * @type {Vue.PropOptions<string | string[]>}
     */
    notFoundData: {
      default: '列表为空'
    },

    /**
     * 是否显示鼠标悬浮 title 文本，仅当 renderFormat 为空或者 renderFormat 返回字符串时生效
     * @type {Vue.PropOptions<boolean | boolean[]>}
     */
    showTitle: {
      default: false,
      type: Boolean
    },

    /**
     * 自定义鼠标悬浮title文本
     * * 前提条件：showTitle=true
     * * 使用场景：当用户使用 render-format 显示html 不都是纯文本,或者用户需要自定义显示 title 文本
     * @typedef {(data: any) => string} RenderTitle
     * @type {Vue.PropOptions<RenderTitle | RenderTitle[]>}
     */
    renderTitle: {
      default: undefined,
      type: Function
    },
    /**
     * 移动后 左侧数据是否保留移动后的数据
     */
    retain: {},
    /**
     * 移动后 是否保持原来的顺序不变 (此时不再显示拖拽按钮)
     */
    fixOrder: {},
    /**
     * 是否可以拖拽来修改数据排序
     */
    draggable: {
      default: true
    },

    /**
     * 拖拽按钮的 class 名称，不传则整体拖拽
     */
    dragIcon: {
      default: 'icon-fk50- icon-fk50-tongyong-wangzhan-tuozhuai1'
    },

    /**
     * 拖拽按钮是否常亮
     * @type {Vue.PropOptions<boolean | boolean[]>}
     */
    alwaysShowHandle: {
      default: true
    }
  },
  computed: {
    ...(() =>
      /** @type {{
      typeLeft(): 'list' | 'table';
      typeRight(): 'list' | 'table';
    }} */ (splitProps('type')))(),

    ...(() =>
      /** @type {{
      itemHeightLeft(): number;
      itemHeightRight(): number;
    }} */ (splitProps('itemHeight', 24)))(),

    ...(() =>
      /** @type {{
      widthLeft(): number;
      widthRight(): number;
    }} */ (splitProps('listWidth', 24)))(),

    ...(() =>
      /** @type {{
      renderFormatLeft(): RenderFormat;
      renderFormatRight(): RenderFormat;
    }} */ (splitProps('renderFormat')))(),

    ...(() =>
      /** @type {{
      filterableLeft(): boolean;
      filterableRight(): boolean;
    }} */ (splitProps('filterable')))(),

    ...(() =>
      /** @type {{
      filterPlaceholderLeft(): string;
      filterPlaceholderRight(): string;
    }} */ (splitProps('filterPlaceholder')))(),

    ...(() =>
      /** @type {{
      filterIconLeft(): string;
      filterIconRight(): string;
    }} */ (splitProps('filterIcon')))(),

    ...(() =>
      /** @type {{
      filterMethodLeft(): FilterMethod;
      filterMethodRight(): FilterMethod;
    }} */ (splitProps('filterMethod')))(),

    ...(() =>
      /** @type {{
      notFoundTextLeft(): string;
      notFoundTextRight(): string;
    }} */ (splitProps('notFoundText')))(),

    ...(() =>
      /** @type {{
      notFoundDataLeft(): string;
      notFoundDataRight(): string;
    }} */ (splitProps('notFoundData')))(),

    ...(() =>
      /** @type {{
      renderTitleLeft(): string;
      renderTitleRight(): string;
    }} */ (splitProps('renderTitle')))(),

    ...(() =>
      /** @type {{
      showTitleLeft(): RenderTitle;
      showTitleRight(): RenderTitle;
    }} */ (splitProps('showTitle')))(),

    ...(() =>
      /** @type {{
      draggableLeft(): boolean;
      draggableRight(): boolean;
    }} */ (splitProps('draggable')))(),

    ...(() =>
      /** @type {{
      dragIconLeft(): string;
      dragIconRight(): string;
    }} */ (splitProps('dragIcon')))(),

    ...(() =>
      /** @type {{
      alwaysShowHandleLeft(): boolean;
      alwaysShowHandleRight(): boolean;
    }} */ (splitProps('alwaysShowHandle')))(),

    /* ----------------------------------- */

    /** 左侧数据选中数量(过滤后) @returns {number} */
    leftCheckedNumFiltered() {
      return this.leftDataFiltered.filter(
        v => this.leftCheckedObj[v[this.keyProp]]
      ).length;
    },
    /** 右侧数据选中数量(过滤后) @returns {number} */
    rightCheckedNumFiltered() {
      return this.rightDataFiltered.filter(
        v => this.rightCheckedObj[v[this.keyProp]]
      ).length;
    },
    /** 左侧数据选中数量 @returns {number} */
    leftCheckedNum() {
      return this.leftData.filter(v => this.leftCheckedObj[v[this.keyProp]])
        .length;
    },
    /** 右侧数据选中数量 @returns {number} */
    rightCheckedNum() {
      return this.rightData.filter(v => this.rightCheckedObj[v[this.keyProp]])
        .length;
    },

    /**
     * 是否可以移动到右边
     * @returns {boolean}
     */
    canMoveRigth() {
      return !!this.leftDataFiltered.find(
        v => !v[DISABLED_PROP] && this.leftCheckedObj[v[this.keyProp]]
      );
    },

    /**
     * 是否可以移动到右边
     * @returns {boolean}
     */
    canMoveLeft() {
      return !!this.rightDataFiltered.find(
        v => !v[DISABLED_PROP] && this.rightCheckedObj[v[this.keyProp]]
      );
    }
  },
  provide() {
    const that = /** @type {any} */ (this);
    return {
      titleProp: that.titleProp,
      keyProp: that.keyProp,
      notFoundData: that.notFoundData,
      notFoundText: that.notFoundText
    };
  },
  data() {
    return {
      /** @type {ResizeObserver} */
      ro: undefined,
      /** 左侧列表保持数量(virtual列表用) */
      leftKeeps: 32,
      /** 右侧列表保持数量(virtual列表用) */
      rightKeeps: 32,
      /** 左侧搜索关键字 */
      leftKeyword: '',
      /** 右侧搜索关键字 */
      rightKeyword: '',
      /** 右侧列表的key的数组 */
      innerValue: [],
      /** 左边列表是否全选 */
      isLeftCheckAll: false,
      /** 右边列表是否全选 */
      isRightCheckAll: false,
      /**
       * 左边列表选中项
       * @type {{[key: string]: boolean}}
       */
      leftCheckedObj: {},
      /**
       * 右边列表选中项
       * @type {{[key: string]: boolean}}
       */
      rightCheckedObj: {},
      /** 左侧列表数据 */
      leftData: [],
      /** 右侧列表数据 */
      rightData: [],
      /** 左侧列表数据(过滤后) */
      leftDataFiltered: [],
      /** 右侧列表数据(过滤后) */
      rightDataFiltered: [],

      /** 中间四个按钮对应的方法 */
      btnMethodMap: {
        right: this['toRight'],
        left: this['toLeft'],
        rightAll: this['toRightAll'],
        leftAll: this['toLeftAll']
      },
      /** 中间四个按钮的图标 */
      btnIconMap: {
        right: 'enter',
        left: 'return',
        rightAll: 'arrow-r',
        leftAll: 'arrow-l'
      }
    };
  },
  watch: {
    data: {
      /**
       * 监听data变化
       * 如果变化则重新根据innerValue来生成leftData和rightData
       */
      handler() {
        const set = new Set();
        this.innerValue = this.targetKeys.slice();
        this.innerValue.forEach(v => set.add(v));
        this.leftData = this.data?.filter(v => !set.has(v[this.keyProp])) || [];
        this.rightData = this.data?.filter(v => set.has(v[this.keyProp])) || [];
        this._search('left');
        this._search('right');
      },
      immediate: true
    },
    /** 左侧选中 */
    leftCheckedObj: {
      handler() {
        this._onCheckedChanged('left');
      },
      deep: true
    },
    /** 右侧选中 */
    rightCheckedObj: {
      handler() {
        this._onCheckedChanged('right');
      },
      deep: true
    },
    /**
     * 「外部控制选中项」发生改变的回调
     */
    selectedKeys: {
      handler() {
        if (!this.selectedKeys) {
          return;
        }
        /** 重新计算左边和右边有哪些要选中 */
        const leftCheckedObj = {};
        const rightCheckedObj = {};
        const set = new Set();
        this.selectedKeys.forEach(v => set.add(v));
        this.leftData.forEach(v => {
          if (set.has(v[this.keyProp])) {
            leftCheckedObj[v[this.keyProp]] = true;
          }
        });
        this.rightData.forEach(v => {
          if (set.has(v[this.keyProp])) {
            rightCheckedObj[v[this.keyProp]] = true;
          }
        });
        this.leftCheckedObj = leftCheckedObj;
        this.rightCheckedObj = rightCheckedObj;

        this._onCheckedChanged('left');
        this._onCheckedChanged('right');
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 当列表中的checkbox选中的回调
     * @private
     * @param {'left' | 'right'} direction 哪边的列表
     */
    _onCheckedChanged(direction) {
      /** 禁用项的数量 */
      let disabledCount = 0;
      /** 非禁用选中项的数量 */
      let checkedCount = 0;

      const obj =
        direction === 'left' ? this.leftCheckedObj : this.rightCheckedObj;
      const list =
        direction === 'left' ? this.leftDataFiltered : this.rightDataFiltered;

      for (let i = 0; i < list.length; i++) {
        if (list[i][DISABLED_PROP]) {
          disabledCount++;
          continue;
        }
        if (obj[list[i][this.keyProp]]) {
          checkedCount++;
        }
      }

      /** 更新「是否全选」的值 */
      this[direction === 'left' ? 'isLeftCheckAll' : 'isRightCheckAll'] =
        disabledCount + checkedCount === list.length && checkedCount > 0;
    },

    /**
     * 全选
     * @private
     * @param {'left' | 'right'} direction 哪边的列表
     * @param {boolean} value 是否选中
     * @param {boolean} [ignoreFilter] 是否选中
     */
    _checkAll(direction, value, ignoreFilter = false) {
      const obj =
        direction === 'left' ? this.leftCheckedObj : this.rightCheckedObj;
      let list =
        direction === 'left' ? this.leftDataFiltered : this.rightDataFiltered;
      if (ignoreFilter) {
        list = direction === 'left' ? this.leftData : this.rightData;
      }

      list.forEach(v => {
        /** 禁用的项不能选中 */
        if (!v[DISABLED_PROP]) {
          this.$set(obj, v[this.keyProp], value);
        }
      });
    },

    /**
     * 搜索列表
     * 会直接改变展示的条目
     * @private
     * @param {'left' | 'right'} direction 哪边的列表
     */
    _search(direction) {
      const defaultFilterMethod = (v, word) =>
        v[this.titleProp]?.includes(word);
      const keyword =
        direction === 'left' ? this.leftKeyword : this.rightKeyword;
      if (direction === 'left') {
        this.leftDataFiltered = this.leftData.filter(v =>
          (this.filterMethodLeft || defaultFilterMethod)(v, keyword)
        );
      } else {
        this.rightDataFiltered = this.rightData.filter(v =>
          (this.filterMethodRight || defaultFilterMethod)(v, keyword)
        );
      }
      this._onCheckedChanged(direction);
    },

    /**
     * 获取选中项的key值
     * @private
     * @param {'left' | 'right'} direction 哪边的列表
     * @returns {string[]}
     */
    _getCheckedKeys(direction) {
      const ret = [];
      const obj =
        direction === 'left' ? this.leftCheckedObj : this.rightCheckedObj;
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key) && obj[key]) {
          ret.push(key);
        }
      }
      return ret;
    },

    /** 选中项移动到右边 (禁用项除外) */
    toRight() {
      const checkedKeys = this._getCheckedKeys('left');
      this._to('right');
      this.$emit(
        'on-change',
        this.rightData.map(v => v[this.keyProp]),
        'right',
        checkedKeys
      );
    },

    /** 选中项移动到左边 (禁用项除外) */
    toLeft() {
      const checkedKeys = this._getCheckedKeys('right');
      this._to('left');
      this.$emit(
        'on-change',
        this.rightData.map(v => v[this.keyProp]),
        'left',
        checkedKeys
      );
    },

    /** 所有项目都移动到右边 (禁用项除外) */
    toRightAll() {
      const checkedKeys = this.leftData.map(v => v[this.keyProp]);
      this._checkAll('left', true, true);
      this._to('right');
      this.$emit(
        'on-change',
        this.rightData.map(v => v[this.keyProp]),
        'right',
        checkedKeys
      );
    },

    /** 所有项目都移动到左边 (禁用项除外) */
    toLeftAll() {
      const checkedKeys = this.rightData.map(v => v[this.keyProp]);
      this._checkAll('right', true, true);
      this._to('left');
      this.$emit('on-change', [], 'left', checkedKeys);
    },

    /**
     * 移动选中项
     * @private
     * @param {'left' | 'right'} direction
     */
    _to(direction) {
      const toList = [];
      const obj =
        direction === 'right' ? this.leftCheckedObj : this.rightCheckedObj;

      for (const id in obj) {
        if (Object.hasOwnProperty.call(obj, id) && obj[id]) {
          toList.push(id);
        }
      }

      this._move(direction, toList);
    },

    /**
     * 基础移动逻辑
     * @private
     * @param {'left' | 'right'} direction 移动方向
     * @param {number | string | (number | string)[]} key 移动项目的key
     * @param {boolean} [disableMoved] 是否移动禁用的项目
     * @returns {boolean}
     */
    _move(direction, key, disableMoved = false) {
      const list = direction === 'right' ? this.leftData : this.rightData;
      const obj =
        direction === 'right' ? this.leftCheckedObj : this.rightCheckedObj;
      const toList = new Set(Array.isArray(key) ? key : [key]);

      /** source边的新列表 */
      const newList = [];
      /** target边需要追加的列表 */
      const appendList = [];
      list.forEach(v => {
        const id = v[this.keyProp];
        /** 禁用项不能移动 */
        if (toList.has(id) && (disableMoved || !v[DISABLED_PROP])) {
          /** 移动后取消选中 */
          obj[id] = false;
          appendList.push(v);
        } else {
          newList.push(v);
        }
      });
      if (appendList.length === 0) {
        return false;
      }

      if (direction === 'right') {
        this.leftData = newList;
        this.rightData = this.rightData.concat(appendList);
        this.isLeftCheckAll = false;
      } else {
        this.rightData = newList;
        this.leftData = this.leftData.concat(appendList);
        this.isRightCheckAll = false;
      }

      /** 移动后重新执行以下搜索 */
      this._search('right');
      this._search('left');
      this.innerValue = this.rightData.map(v => v[this.keyProp]);
      return true;
    },

    /**
     * 外部调用该方法，控制节点去指定的面板
     * 返回是否有项目移动了
     * @param {Object} moveToObj
     * @param {'left' | 'right'} moveToObj.direction 移动方向
     * @param {number | string | (number | string)[]} moveToObj.key 移动项目的key
     * @param {boolean} [moveToObj.disableMoved] 是否移动禁用的项目
     * @returns {boolean}
     */
    moveToByOutside(moveToObj) {
      moveToObj;
      const { direction, key, disableMoved } = moveToObj;
      return this._move(direction, key, disableMoved);
    }
  },
  mounted() {
    /** 监听元素尺寸变化 修改keeps的值 */
    this.ro = new ResizeObserver(() => {
      this.leftKeeps =
        Math.ceil(
          this.$el.querySelector('.fais-transfer-list__list').offsetHeight /
            this.itemHeightLeft
        ) * 2;
      this.rightKeeps =
        Math.ceil(
          this.$el.querySelector('.fais-transfer-list__list').offsetHeight /
            this.itemHeightRight
        ) * 2;
    });
    this.ro.observe(this.$el);
  },
  beforeDestroy() {
    this.ro.disconnect();
    this.ro = null;
  }
};
</script>
