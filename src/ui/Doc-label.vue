<template>
  <span class="doc-label font-semibold">
    {{ props.text }}
  </span>
</template>

<script setup lang="ts">

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
})
</script>

<style lang="less" scoped>
.doc-label {
  display: block;
  font-size: 16px;
  margin-top: 35px;
  margin-bottom: 20px;
}
</style>