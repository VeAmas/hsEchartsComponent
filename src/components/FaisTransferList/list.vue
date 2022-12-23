<template>
  <div class="fais-transfer-list__list">
    <DraggableVirtualScrollList
      ref="list"
      v-show="dataFiltered.length > 0"
      :value="keyword ? dataFiltered : value"
      style="overflow: auto"
      :class="`list-${direction} f-h100`"
      :group="`list-${direction}`"
      :handle="dragIcon ? '.handle' : undefined"
      :disabled="keyword || !draggable"
      :size="itemHeight"
      :estimate-size="itemHeight"
      :keeps="keeps"
      :data-key="keyProp"
      :data-sources="keyword ? dataFiltered : value"
      :data-component="Row"
      :extraProps="{
        keyword: keyword,
        keyProp: keyProp,
        titleProp: titleProp,
        checkedObj: checkedObj,
        renderFormat: renderFormat,
        showTitle: showTitle,
        renderTitle: renderTitle
      }"
      @input="$emit('input', $event)"
    ></DraggableVirtualScrollList>
    <div v-show="dataFiltered.length === 0" class="f-tc theme-text-disable">
      {{ value.length === 0 ? notFoundData : notFoundText }}
    </div>
  </div>
</template>

<script>
import Row from './row';
import DraggableVirtualScrollList from './DraggableVirtualScrollList';

export default {
  components: { DraggableVirtualScrollList },
  provide() {
    return {
      $list: this
    };
  },
  props: [
    'direction',
    'dataFiltered',
    'value',
    'keyword',
    'itemHeight',
    'keeps',
    'type',
    'checkedObj',
    'renderFormat',
    'showTitle',
    'renderTitle',
    'draggable',
    'dragIcon',
    'alwaysShowHandle'
  ],
  watch: {
    keeps: {
      handler(keeps) {
        if (this.type === 'list') {
          this.$nextTick(() => {
            try {
              /** keeps变动的时候需要更新buffer值 */
              this.$refs.list.$children[0].virtual.param.buffer = Math.round(
                keeps / 3
              );
            } catch {
              /** noop */
            }
          });
        }
      },
      immediate: true
    }
  },
  inject: ['titleProp', 'keyProp', 'notFoundData', 'notFoundText'],
  data() {
    return {
      Row
    };
  },
  methods: {
    rowDblClcik(data) {
      this.$emit('on-double-click', data);
    }
  }
};
</script>
