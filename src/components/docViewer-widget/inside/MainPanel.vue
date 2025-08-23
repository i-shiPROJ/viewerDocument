<template>
  <main>
    <div class="not-current">
      <span>Выберите документ, чтобы посмотреть его содержимое</span>
    </div>
  </main>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
main {
  width: 100%;
  flex: 1;
  background-color: #fff;
  display: flex;

  .not-current {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
}
</style>