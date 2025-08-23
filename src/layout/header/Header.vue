<template>
  <header>
    <div class="nameApp font-bold">MyApp</div>
    <div class="nameuser font-normal">{{ userStore.account.login }}</div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 55px 0px 50px 0px;

  .nameApp {
    font-size: 32px;
  }

  .nameuser {
    font-size: 16px;
  }
}
</style>