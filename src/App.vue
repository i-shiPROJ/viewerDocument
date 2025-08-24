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
import Header from "./layout/header/Header.vue";
import Footer from "./layout/footer/Footer.vue";
</script>

<style lang="less">
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;

  .app-body {
    min-height: 100%;
    width: 100%;
    max-width: 1266px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    
    @media (max-width: 768px) {
      padding: 0 15px;
    }
    
    @media (max-width: 576px) {
      padding: 0 10px;
    }
  }
}

.main-content {
  display: flex;
  flex: 1;
  height: 100%;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001a;
  overflow: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    border-radius: 8px;
  }
  
  @media (max-width: 576px) {
    border-radius: 6px;
    border: none;
    box-shadow: 0px 2px 8px 0px #00000015;
  }
}
</style>
