<template>
  <aside>
    <docLabel text="Поиск документа" />
    <docInput tooltip="Введите ID документа" v-model="textSearch" debounce />

    <div v-if="isLoading" class="loading">Загрузка данных...</div>

    <ErrorMessage 
      v-else-if="error" 
      :error="error" 
      :retryFunction="retrySearch"
    />

    <FileResult 
      v-else-if="!!textSearch" 
      :files="searchResults" 
      :hasError="!!error"
    />

    <div v-else-if="!!textSearch && searchResults.length === 0 && !error" class="no-results">
      По вашему запросу ничего не найдено
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import docLabel from "@/ui/Doc-label.vue";
import docInput from "@/ui/Doc-input.vue";
import FileResult from "@/ui/file-result/File-result.vue";
import ErrorMessage from "@/ui/ErrorMessage.vue";
import { documentsApi } from "@/config/api";
import type { DocumentList } from "@/types/DocumentList";
import { useCurrentItemStore } from "@/stores/CurrenItem";

const currentItemStore = useCurrentItemStore();

const textSearch = ref<string>("");
const searchResults = ref<DocumentList[]>([]);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

//поиск
const searchDocuments = async (searchTerm: string) => {
  try {
    isLoading.value = true;
    error.value = null;
    const apiUrl = documentsApi.getDocuments(searchTerm);

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Статус: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Неверный формат данных от сервера');
    }
    
    searchResults.value = data;
  } catch (err) {
    console.error("Ошибка при поиске документов:", err);
    // при наличии общего приложения вот эту часть вынести в отдельный метод
    if (err instanceof TypeError && err.message.includes('fetch')) {
      error.value = 'Ошибка сети. Проверьте подключение к интернету.';
    } else if (err instanceof Error && err.message.includes('HTTP ошибка')) {
      const statusCode = err.message.match(/\d{3}/)?.[0] || 'unknown';
      switch (statusCode) {
        case '404':
          error.value = 'Сервер не найден. Попробуйте позже.';
          break;
        case '500':
          error.value = 'Ошибка сервера. Попробуйте позже.';
          break;
        case '401':
        case '403':
          error.value = 'Ошибка авторизации. Проверьте права доступа.';
          break;
        default:
          error.value = `Ошибка сервера: ${err.message}`;
          break;
      }
    } else if (err instanceof Error && err.message.includes('формат данных')) {
      error.value = 'Ошибка получения данных. Попробуйте позже.';
    } else {
      error.value = 'Произошла неизвестная ошибка. Попробуйте позже.';
    }
    
    searchResults.value = [];
  } finally {
    isLoading.value = false;
    currentItemStore.clearCurrentItem();
  }
};

// Для повторного поиска(испольщуем в ошибке)
const retrySearch = () => {
  if (textSearch.value) {
    searchDocuments(textSearch.value);
  }
};

// Следим за изменением поискового запроса
watch(textSearch, (newValue) => {
  if (newValue) {
    error.value = null; // Сбрасываем ошибку при новом поиске
    searchDocuments(newValue);
  } else {
    searchResults.value = [];
    error.value = null;
  }
});

// Следим за результатами поиска
watch(searchResults, (newResults) => {
  if (newResults && newResults.length === 0) {
    currentItemStore.clearCurrentItem();
  }
});

// Следим за очищением из стора выбранного элемента
watch(() => currentItemStore.currentItem, (newValue) => {
  if (!newValue) {
    textSearch.value = '';
  }
}, { immediate: true });

onUnmounted(() => {
  currentItemStore.clearCurrentItem();
});
</script>

<style lang="less" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: 292px;
  border-right: 1px solid #e0e0e0;
  padding: 0px 20px;
  background-color: #fdfdfd;
  
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 20px;
    min-height: auto;
  }
  
  @media (max-width: 576px) {
    padding: 15px;
  }
}

.loading {
  text-align: center;
  padding: 20px;
  color: #6c757d;
  
  @media (max-width: 576px) {
    padding: 15px;
    font-size: 14px;
  }
}

.no-results {
  text-align: center;
  padding: 20px;
  color: #6c757d;
  font-style: italic;
  
  @media (max-width: 576px) {
    padding: 15px;
    font-size: 14px;
  }
}
</style>
