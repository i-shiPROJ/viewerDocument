<template>
  <header>
    <div class="nameApp font-bold">MyApp</div>
    <div class="nameuser font-normal hidden-mobile">{{ userStore.account.login }}</div>
    <div class="mobile-menu-toggle visible-mobile" @click="toggleMobileMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    
    <!-- Мобильное меню -->
    <div v-if="isMobileMenuOpen" class="mobile-menu visible-mobile">
      <div class="mobile-menu-item">
        <span class="mobile-menu-label">Пользователь:</span>
        <span class="mobile-menu-value">{{ userStore.account.login }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 55px 0px 50px 0px;
  position: relative;

  .nameApp {
    font-size: 32px;
    
    @media (max-width: 768px) {
      font-size: 28px;
    }
    
    @media (max-width: 576px) {
      font-size: 24px;
    }
  }

  .nameuser {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  
  .mobile-menu-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
    padding: 8px;
    
    span {
      width: 25px;
      height: 3px;
      background-color: #333;
      margin: 3px 0;
      transition: 0.3s;
      border-radius: 2px;
    }
    
    @media (max-width: 768px) {
      display: flex;
    }
  }
  
  .mobile-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    padding: 16px;
    min-width: 200px;
    z-index: 1000;
    
    .mobile-menu-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      .mobile-menu-label {
        font-size: 12px;
        color: #6c757d;
        font-weight: 500;
      }
      
      .mobile-menu-value {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
    }
  }
}

@media (max-width: 768px) {
  header {
    height: 80px;
    padding: 40px 0px 30px 0px;
  }
}

@media (max-width: 576px) {
  header {
    height: 70px;
    padding: 30px 0px 20px 0px;
  }
}
</style>
