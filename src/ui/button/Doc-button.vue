<template>
  <div
    class="doc-button font-normal"
    :class="{
      blue: color === 'blue',
      red: color === 'red',
      disabled: disabled,
    }"
    @click="handleClick"
  >
    <span>{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: "Button",
  },
  color: {
    type: String,
    default: "blue",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  if (!props.disabled) {
    emit("click");
  }
};
</script>

<style lang="less" scoped>
.doc-button {
  min-width: 114px;
  height: 31px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  gap: 8px;
  font-size: 14px;
  transition: all 0.2s ease;

  &.blue {
    color: #0d6efd;
    border: 1px solid #0d6efd;
  }

  &.red {
    color: #dc3545;
    border: 1px solid #dc3545;
  }

  &.disabled {
    color: #6c757d;
    border: 1px solid #6c757d;
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(.disabled):hover {
    cursor: pointer;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
