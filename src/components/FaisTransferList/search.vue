<template>
  <div class="fais-transfer-list__search f-mb-8 f-plr-8">
    <h-input
      v-model="innerValue"
      size="small"
      :icon="!innerValue ? icon : 'close'"
      :placeholder="placeholder"
      @input="_search('left')"
      @on-click="innerValue && ((innerValue = '') || _search('left'))"
    ></h-input>
  </div>
</template>

<script>
export default {
  props: ['value', 'icon', 'placeholder'],
  data() {
    return {
      innerValue: ''
    };
  },
  watch: {
    innerValue(n) {
      this.$emit('input', n);
    }
  },
  methods: {
    _search() {
      this.$emit('input', this.innerValue);
      this.$emit('on-search');
    }
  }
};
</script>
