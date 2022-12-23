// @ts-nocheck
import { DISABLED_PROP } from './transferList.vue';

export default {
  props: {
    titleProp: String,
    renderFormat: Function,
    renderTitle: Function,
    showTitle: Boolean,
    index: Number,
    keyProp: String,
    keyword: String,
    source: {
      default: () => ({})
    },
    checkedObj: {
      default: () => ({})
    }
  },
  inject: ['$list'],
  methods: {
    /** 获取行内容 */
    getTitle() {
      const rawTitle = this.source[this.titleProp];
      if (this.renderFormat) {
        try {
          return this.renderFormat(
            this.$createElement,
            this.source,
            this.index
          );
        } catch {
          /** 如果renderFomat报错了 就返回原始内容 */
          return rawTitle;
        }
      }
      return rawTitle;
    }
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    const title = this.getTitle();
    return (
      <div class="fais-transfer-list__row theme-bg-dropdown-item-hover f-flex-row">
        <h-checkbox
          disabled={this.source[DISABLED_PROP]}
          class={
            'f-flex-1 f-plr-8 f-w100 f-ellipsis f-dib ' +
            (typeof title === 'string' ? '' : 'custom-render  f-flex-row') +
            (this.source[DISABLED_PROP]
              ? ' theme-text-disable'
              : ' theme-text-link-hover')
          }
          title={
            /**
             * 如果有renderTitle那么让用户生成
             * 否则
             *   如果有renderFormat的结果是字符串 就用该结果
             *   否则用label字段
             */
            this.showTitle
              ? this.renderTitle?.(this.source) ??
                (typeof title === 'string'
                  ? title
                  : this.source[this.titleProp])
              : ''
          }
          value={this.checkedObj[this.source[this.keyProp]]}
          on-input={v =>
            this.$set(this.checkedObj, this.source[this.keyProp], v)
          }
          nativeOn-dblclick={() => {
            this.$list.rowDblClcik(this.source);
          }}
        >
          {typeof title === 'string' ? (
            <div
              class={{ 'theme-text-disable': this.source[DISABLED_PROP] }}
              style="display: inline"
            >
              {title}
            </div>
          ) : (
            title
          )}
        </h-checkbox>
        {
          /**
           * 如果dragIcon为空 则表示整体拖拽(没有handle)
           * 如果draggable为false 则也不显示把手
           */
          this.$list.dragIcon && this.$list.draggable ? (
            <span
              class={
                'handle f-cur-p theme-icon-normal f-ml-0 ' +
                (this.$list.alwaysShowHandle ? 'always-show-handle' : '')
              }
              style={{ display: this.keyword ? 'none' : '' }}
            >
              <i class={this.$list.dragIcon}></i>
            </span>
          ) : (
            ''
          )
        }
      </div>
    );
  }
};
