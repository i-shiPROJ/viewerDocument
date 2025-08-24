<template>
  <span
    class="doc-label font-semibold"
    :class="{ 'margin-top': !notMarginTop }"
  >
    {{ props.text }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  notMarginTop: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="less" scoped>
.doc-label {
  display: block;
  font-size: 16px;
  margin-bottom: 20px;

  &.margin-top {
    margin-top: 35px;
  }
}
</style>
