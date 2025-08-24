<template>
  <div v-if="error" class="error-message">
    <div class="content">
      <div class="title">Ошибка</div>
      <div class="text">{{ error }}</div>
      <button v-if="retryFunction" @click="handleRetry" class="retry-button">
        Попробовать снова
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string | null;
  retryFunction?: () => void;
}

const props = defineProps<Props>();

const handleRetry = () => {
  if (props.retryFunction) {
    props.retryFunction();
  }
};
</script>

<style lang="less" scoped>
.error-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  margin: 16px 0;
  background-color: #fff5f6;
  border: 1px solid #DC3545;
  border-radius: 8px;
  color: #DC3545;

  .content {
    flex: 1;

    .title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .text {
      font-size: 13px;
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .retry-button {
      background-color: #dc2626;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #b91c1c;
      }

      &:active {
        background-color: #991b1b;
      }
    }
  }
}
</style>
