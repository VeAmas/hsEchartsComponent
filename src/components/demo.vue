<template>
  <div class="demo-wrapper">
    <h-split ref="demo" v-model="splitH" class="demo">
      <div class="demo-frame" slot="left">
        <component :is="cmpt"></component>
      </div>

      <div class="code" slot="right">
        <h-split v-model="splitV" mode="vertical">
          <div slot="top" ref="template" style="height: 100%"></div>
          <div slot="bottom" ref="script" style="height: 100%"></div>
        </h-split>
        <h-button type="primary" @click="applyDemo">应用</h-button>
      </div>
    </h-split>
    <div ref="dragBar" class="drag-bar h-split-trigger-con">
      <div class="h-split-trigger h-split-trigger-horizontal">
        <div class="h-split-trigger-bar-con horizontal">
          <i class="h-split-trigger-bar"></i><i class="h-split-trigger-bar"></i
          ><i class="h-split-trigger-bar"></i><i class="h-split-trigger-bar"></i
          ><i class="h-split-trigger-bar"></i><i class="h-split-trigger-bar"></i
          ><i class="h-split-trigger-bar"></i
          ><i class="h-split-trigger-bar"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ts-check
import Vue from 'vue';
import CodeMirror from 'codemirror';
import prettier from 'prettier';
// @ts-ignore 获取html的parser
import parserHtml from 'prettier/esm/parser-html.mjs';
// @ts-ignore 获取js的parser
import parserBabel from 'prettier/esm/parser-babel.mjs';
// @ts-ignore 获取prettier的配置
import prettierConfig from '../../.prettierrc';
import 'codemirror/mode/vue/vue.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';

const prettierConfigJSON = new Function('', 'return ' + prettierConfig)();

export default {
  name: 'test',
  props: {
    template: String,
    script: String,
    initHeight: String
  },
  data() {
    return {
      splitH: 0.5,
      splitV: 0.5,
      templateBind: '',
      scriptBind: '',
      cmpt: null,
      /** @type {CodeMirror.Editor} */
      scriptMirror: null,
      /** @type {CodeMirror.Editor} */
      templateMirror: null
    };
  },
  methods: {
    /** 应用demo的代码 */
    applyDemo() {
      const option = new Function('', `return ${this.scriptBind.trim()}`)();
      option.template = this.templateBind;

      this.cmpt = Vue.component('cmpt' + +new Date(), option);
    },
    /** 初始化底部(控制高度的)拖动条的事件 */
    initDragBar() {
      const dragBar = /** @type {HTMLDivElement} */ (this.$refs.dragBar);
      const demo = /** @type {HTMLDivElement} */ (
        /** @type {Vue} */ (this.$refs.demo).$el
      );
      let originHeight = 0;

      dragBar.addEventListener('mousedown', () => {
        const mouseup = (/** @type {MouseEvent} */ e) => {
          e.stopPropagation();
          window.removeEventListener('mouseup', mouseup);
          window.removeEventListener('mousemove', mousemove);
        };
        const mousemove = (/** @type {MouseEvent} */ e) => {
          const newBottom = e.movementY;
          originHeight = originHeight + newBottom;
          demo.style.height = originHeight + 'px';

          this.onSplitVChanged();

          e.stopPropagation();
        };

        originHeight = demo.offsetHeight;
        window.addEventListener('mouseup', mouseup);
        window.addEventListener('mousemove', mousemove);
      });
    },
    /** 输入框尺寸修改时 重新resize一下 */
    onSplitVChanged() {
      const scriptDom = /** @type {HTMLDivElement} */ (this.$refs.script);
      const templateDom = /** @type {HTMLDivElement} */ (this.$refs.template);
      this.scriptMirror.setSize(scriptDom.offsetWidth, scriptDom.offsetHeight);
      this.templateMirror.setSize(
        templateDom.offsetWidth,
        templateDom.offsetHeight
      );
    }
  },
  mounted() {
    this.scriptBind = this.script.trim();
    this.templateBind = this.template.trim();
    delete this.scriptMirror;
    delete this.templateMirror;

    const scriptDom = /** @type {HTMLDivElement} */ (this.$refs.script);
    const templateDom = /** @type {HTMLDivElement} */ (this.$refs.template);

    this.scriptMirror = CodeMirror(scriptDom, {
      value: this.scriptBind,
      mode: 'javascript',
      tabSize: 2,
      /** 显示行号 */
      lineNumbers: true,
      /** 是否自动换行 */
      lineWrapping: false,
      /** 折叠代码 */
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      extraKeys: {
        /** 格式化 */
        'Shift-Alt-F': function (cm) {
          prettier;
          cm.setValue(
            prettier
              /** 前面加一个 「a = 」 不然不识别为js */
              .format('a=' + cm.getValue(), {
                ...prettierConfigJSON,
                parser: 'babel',
                plugins: [parserBabel]
              })
              .substring(4)
          );
        }
      },
      scrollbarStyle: 'native'
    });
    this.templateMirror = CodeMirror(templateDom, {
      value: this.templateBind,
      mode: { name: 'vue' },
      tabSize: 2,
      /** 显示行号 */
      lineNumbers: true,
      /** 是否自动换行 */
      lineWrapping: false,
      /** 折叠代码 */
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      extraKeys: {
        /** 格式化 */
        'Shift-Alt-F': function (cm) {
          cm.setValue(
            prettier.format(cm.getValue(), {
              ...prettierConfigJSON,
              parser: 'html',
              plugins: [parserHtml]
            })
          );
        }
      },
      scrollbarStyle: 'native'
    });

    /** 监听横向纵向的拖拽条 */
    this.$watch('splitV', this.onSplitVChanged);
    this.$watch('splitH', this.onSplitVChanged);
    document.addEventListener('resize', this.onSplitVChanged);

    /** 输入框值变化的时候 修改vue组件里的值 */
    this.scriptMirror.on('change', e => {
      this.scriptBind = e.getValue();
    });
    this.templateMirror.on('change', e => {
      this.templateBind = e.getValue();
    });

    this.applyDemo();
    this.initDragBar();

    if (this.initHeight) {
      const demo = /** @type {HTMLDivElement} */ (
        /** @type {Vue} */ (this.$refs.demo).$el
      );
      demo.style.height = this.initHeight;
    }
  },
  destroyed() {
    document.removeEventListener('resize', this.onSplitVChanged);
  }
};
</script>

<style lang="less" scoped>
.demo-wrapper {
  position: relative;
  padding-bottom: 6px;
}
.demo {
  height: 800px;
  border-width: 1px;
  border-color: #d6d6d6;
  border-style: solid;
}
.demo-frame {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.drag-bar {
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: 0;
}

.code {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  /deep/.CodeMirror {
    height: 100%;

    .CodeMirror__wrapper {
      resize: both;
      overflow: auto !important;
    }
  }
}
</style>