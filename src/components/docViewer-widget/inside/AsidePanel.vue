<template>
  <aside>
    <docLabel text="Поиск документа" />
    <docInput tooltip="Введите ID документа" v-model="textSearch" debounce />

    <div v-if="isLoading" class="loading">
      Загрузка данных...
    </div>

    <FileResult v-else="!!textSearch" :files="searchResults" />

  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import docLabel from '@/ui/Doc-label.vue';
import docInput from '@/ui/Doc-input.vue';
import FileResult from '@/ui/file-result/File-result.vue';
import { documentsApi } from '@/config/api';
import type { DocumentList } from '@/types/DocumentList';

const textSearch = ref<string>('');
const searchResults = ref<DocumentList[]>([]);
const isLoading = ref<boolean>(false);

//поиск
const searchDocuments = async (searchTerm: string) => {
  try {
    isLoading.value = true;
    const apiUrl = documentsApi.getDocuments(searchTerm);
    console.log('API URL:', apiUrl);

    // Здесь будет вызов API
    const response = await fetch(apiUrl);
    const data = await response.json();
    searchResults.value = data;

  } catch (error) {
    console.error('Ошибка при поиске документов:', error);
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Следим за изменением поискового запроса
watch(textSearch, (newValue) => {
  if (newValue) {
    searchDocuments(newValue);
  } else {
    searchResults.value = [];
  }
});
</script>

<style lang="less" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: 292px;
  border-right: 1px solid #E0E0E0;
  padding: 0px 20px;
  background-color: #FDFDFD;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #6C757D;
}
</style>