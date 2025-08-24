<template>
  <footer>
    <div class="footer-content">
      <span class="footer-text">© {{ new Date().getFullYear() }} iSHIPROJ</span>
    </div>
  </footer>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
footer {
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    height: 50px;
  }
  
  @media (max-width: 576px) {
    height: 45px;
  }
  
  .footer-content {
    text-align: center;
    
    .footer-text {
      font-size: 14px;
      color: #6c757d;
      
      @media (max-width: 576px) {
        font-size: 12px;
      }
    }
  }
}
</style>