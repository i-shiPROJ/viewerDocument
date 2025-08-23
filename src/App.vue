<template>
  <div id="app">
    <div class="app-body">
      <Header />
      
      <main class="main-content">
        <router-view />
      </main>
      
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './layout/header/Header.vue'
import Footer from './layout/footer/Footer.vue'
</script>

<style lang="less">
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;

  .app-body {
    min-height: 100%;
    width: 1266px;
    display: flex;
    flex-direction: column;
  }
}

.main-content {
  display: flex;
  flex: 1;
  height: 100%;
  background-color: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001A;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
