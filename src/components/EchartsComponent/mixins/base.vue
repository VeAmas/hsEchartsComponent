<script>
// @ts-check
export default {
  data() {
    return {
      isEchartsComponentPart: true,
      reactiveKeys: []
    };
  },
  methods: {
    broadcast() {
      const loop = n => {
        n?.register();
        n.children?.forEach(loop);
      };
      this.$children.forEach(loop);
    },
    /**
     * 查找更新该组件是 需要联动更新的组件
     * @returns {typeof this[]}
     */
    findCollaborationCmps() {
      return [];
    }
  },
  created() {
    const watch = key => {
      this.$watch(
        () => this[key],
        (newValue, oldValue) => {
          /** 数组情况比较特殊 好像比较不了 就直接触发更新好了 */
          if (!Array.isArray(newValue)) {
            if (typeof newValue === 'object' && typeof oldValue === 'object') {
              try {
                if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
                  return;
                }
              } catch (e) {
                console.error(e);
              }
            }
            if (newValue === oldValue) {
              return;
            }
          }
          const owner = this.owner ?? this;
          // @ts-ignore
          owner.triggerUpdate(this);
        },
        {
          deep: true
        }
      );
    };
    if (this.$options.props) {
      for (const key in this.$options.props) {
        if (Object.hasOwnProperty.call(this.$options.props, key)) {
          watch(key);
        }
      }
      this.reactiveKeys.forEach(v => {
        watch(v);
      });
    }
  }
};
</script>
