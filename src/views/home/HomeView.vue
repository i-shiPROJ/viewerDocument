<template>
<div class="home-view">
  <docViewerWidget />
</div>

</template>

<script setup lang="ts">
import docViewerWidget from '@/components/docViewer-widget/DocViewer-widget.vue';
</script>

<style lang="less" scoped>
  .home-view {
    min-height: 100%;
    width: 100%;
  }
</style>