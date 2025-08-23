<template>
  <div>
    <input type="text" :placeholder="props.tooltip" :value="modelValue" @input="updateValue">
  </div>
</template>

<script setup lang="ts">
import debounce from 'lodash.debounce';
import { onUnmounted } from 'vue'

const props = defineProps({
  tooltip: {
    type: String,
    default: 'Введите текст'
  },
  debounce: {
    type: Boolean,
    default: false
  },
  debounceDelay: {
    type: Number,
    default: 300
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

// Обновляем по debounce
const debouncedEmit = debounce((value: string) => {
  emit('update:modelValue', value)
}, props.debounceDelay)

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  
  if (props.debounce) {
    debouncedEmit(target.value);
  } else {
    emit('update:modelValue', target.value);
  }
}

onUnmounted(() => {
  debouncedEmit.cancel()
})
</script>

<style lang="less" scoped>
input {
  width: 100%;
  background: transparent;
  border: 1.5px solid #E9ECEF;
  border-radius: 10px;
  outline: none;
  padding: 15px 30px;
  color: #6C757D;
  caret-color: #6C757D;

  &:focus {
    border-color: #E9ECEF;
  }

  &::placeholder {
    color: #6C757D;
  }
}
</style>