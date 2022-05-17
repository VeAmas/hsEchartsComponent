<template>
  <div ref="doc" class="doc" :key="key">
    <template v-for="(item, index) in htmls">
      <div
        v-if="typeof item === 'string'"
        :key="index"
        v-html="item"
        class="markdown-body"
      ></div>
      <Demo
        v-else
        :init-height="item.height"
        :key="index"
        :template="item.template"
        :script="item.script"
      ></Demo>
    </template>
  </div>
</template>

<script>
// @ts-check
import showdown from 'showdown';
import Demo from './demo.vue';
/**
 * @typedef {import('../type/Demo').Demo} Demo
 *
 */
export default {
  name: '',
  components: { Demo },
  data() {
    return {
      key: 0,
      /** @type {(string | Demo)[]} */
      htmls: []
    };
  },
  methods: {
    init() {
      this.$el.parentElement.scrollTop = 0;
      this.key++;
      const converter = new showdown.Converter({
        tables: true
      });

      /** @type {Demo[]} */
      const demos = [];
      /** @type {string[]} */
      const scripts = [];
      /** @type {string[]} */
      const templates = [];
      /** @type {string} */
      // @ts-ignore
      const mdRaw = this.$route.meta.md;
      let demoQuery = [];
      /** 把md中的demo截取出来 */
      const mdReplaced = mdRaw
        .replace(/```template[\s\S\n]*?```/g, match => {
          let content = match.match(/```template([\s\S\n]*?)```/)[1];
          const query = content.match?.(/^\?\{.*?\};/)?.[0] ?? '';
          content = content.replace(query, '');
          try {
            demoQuery.push(JSON.parse(query.substring(1, query.length - 1)));
          } catch (e) {
            demoQuery.push({});
            console.warn(e);
          }
          templates.push(content);
          return '#SPLIT#';
        })
        .replace(/```script[\s\S\n]*?```/g, match => {
          scripts.push(match.match(/```script([\s\S\n]*?)```/)[1]);
          return '#SPLIT#';
        });

      /** script和template单独拿出来 存在demos数组中 */
      for (let i = 0; i < scripts.length; i++) {
        demos.push({
          script: scripts[i],
          template: templates[i],
          height: (demoQuery[i]?.height ?? '400') + 'px'
        });
      }
      /** @type {(string | Demo)[]} */
      const mdList = [];
      /** 用demo的位置 将md分割成若干份 遍历渲染 */
      mdReplaced
        .split('#SPLIT#')
        .filter(v => v?.trim())
        .forEach((v, i) => {
          mdList.push(converter.makeHtml(v));
          mdList.push(demos[i]);
        });

      this.htmls = mdList.filter(v => v);
    }
  },
  mounted() {
    this.init();
    /** 切换tab的时候 重新渲染 */
    this.$watch('$route.meta', this.init);
  }
};
</script>

<style lang="less" scoped>
/deep/ol {
  list-style-type: decimal;
}
/deep/ul {
  list-style-type: disc;
}

.doc {
  padding: 12px;
  padding-bottom: 200px;
}

.demo-wrapper {
  margin-top: 12px;
}
</style>
