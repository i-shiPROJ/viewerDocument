<template>
  <div class="doc-viewer">
    <asidePanel />
    <mainPanel />
  </div>
</template>

<script setup lang="ts">
import asidePanel from "./inside/AsidePanel.vue";
import mainPanel from "./inside/MainPanel.vue";
</script>

<style lang="less" scoped>
.doc-viewer {
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
