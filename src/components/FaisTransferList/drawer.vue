<template>
  <div>
    <h-drawer
      v-model="value"
      v-bind="$attrs"
      class-name="drawer-body-p12"
      :mask-closable="false"
      :maskStyle="'z-index: 999;' + ($attrs.maskStyle || '')"
      v-on="$listeners"
    >
      <div class="f-flex f-flex-column f-h100">
        <div class="f-flex-1" style="height: 0">
          <TransferList
            v-if="value"
            ref="Transfer"
            :data="data"
            title=""
            :keyProp="keyProp"
            v-bind="$attrs"
          >
            <template #btns="{ scope }">
              <slot name="btns" :scope="scope"> </slot>
            </template>
          </TransferList>
        </div>

        <footer class="f-flex f-justify-center f-mt-12">
          <h-button type="ghost" class="f-mr-6" @click="close">取消</h-button>
          <h-button type="primary" @click="confirm">确定</h-button>
        </footer>
      </div>

      <template v-for="(_, slotName) in $slots" #[slotName]>
        <slot :name="slotName"></slot>
      </template>
    </h-drawer>
  </div>
</template>

<script>
import TransferList from './transferList.vue';

/**
 * @typedef {InstanceType<typeof TransferList>} TransferList
 * @typedef {{
 *  $refs: {
 *   Transfer?: TransferList
 *  }
 * }} $refs
 */

export default {
  name: 'FaisTransferTree',
  components: {
    TransferList
  },
  props: {
    data: Array,
    value: {
      type: Boolean,
      default: false
    },
    keyProp: {
      default: 'key'
    },
    maxCount: {
      type: Number,
      validator(val) {
        return val > 0;
      },
      default: 20
    },
    minCount: {
      type: Number,
      validator(val) {
        return val >= 0;
      },
      default: 0
    }
  },
  data() {
    const data = {};
    return /** @type {$refs & typeof data} */ (data);
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
    confirm() {
      const targetNodes = this.$refs.Transfer.rightData;
      if (targetNodes.length > this.maxCount) {
        this.$hMessageSafe.warning(`数据不能超过${this.maxCount}条!`);
        return;
      }
      if (targetNodes.length < this.minCount) {
        this.$hMessageSafe.warning(`数据不能少于${this.minCount}条!`);
        return;
      }
      this.$emit('on-confirm', {
        targetKeys: targetNodes.map(v => v[this.keyProp]),
        targetNodes
      });
      this.close();
    },
    getTargetData() {
      return this.$refs.Transfer.rightData.slice();
    }
  }
};
</script>

<style lang="less" scoped>
.fais-transfer-list__content {
  height: 100%;
}

/deep/ .fais-transfer-list__left-panel,
/deep/ .fais-transfer-list__right-panel {
  flex: 1;
}
</style>
