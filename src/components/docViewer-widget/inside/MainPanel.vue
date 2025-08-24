<template>
  <main>
    <div v-if="getBodyDocument" class="document-container">
      <div class="document-image">
        <img :src="getImg" alt="Документ" />
      </div>
      <div class="document-content">
        <div class="document-header">
          <docLabel :text="getNameDoc" notMarginTop />
          <div class="control">
            <docButton 
              text="Скачать" 
              @click="downloadDocument"
            />
            <docButton 
              text="Удалить" 
              color="red"
              :disabled="!hasImage || isDeleting"
              @click="deleteDocument"
            />
          </div>
        </div>
        
        <div v-if="deleteError" class="delete-error">
          <ErrorMessage :error="deleteError" :retryFunction="retryDelete" />
        </div>
        
        <div class="document-description">
          <docLabel text="Описание:" />
          <span class="description-text font-medium">
            {{ getDescription }}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <span>Выберите документ, чтобы посмотреть его содержимое</span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCurrentItemStore } from '@/stores/CurrenItem';
import docLabel from '@/ui/Doc-label.vue';
import docButton from '@/ui/button/Doc-button.vue';
import ErrorMessage from '@/ui/ErrorMessage.vue';

const currentItemStore = useCurrentItemStore();
const isDeleting = ref(false);
const deleteError = ref<string | null>(null);

const getBodyDocument = computed(() => {
  return currentItemStore.currentItem !== null ? true : false;
});

const getImg = computed(() => {
  return currentItemStore.currentItem?.image ? currentItemStore.currentItem?.image : 'src/assest/file.png'
});

const getNameDoc = computed(()=>{
  return currentItemStore.currentItem?.name
});

const getDescription = computed(() => {
  return currentItemStore.currentItem?.description
});

const hasImage = computed(() => {
  return currentItemStore.currentItem?.image !== null;
});

const downloadDocument = () => {
  if (!currentItemStore.currentItem) return;
  
  const documentItem = currentItemStore.currentItem;
  const content = `Название: ${documentItem.name}\n\nОписание:\n${documentItem.description}`;
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${documentItem.name}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const deleteDocument = async () => {
  if (!hasImage.value || !currentItemStore.currentItem) return;
  
  try {
    isDeleting.value = true;
    deleteError.value = null;
    
    // по идее должен быть такой запрос
    // const response = await fetch(`/user/docs/${currentItemStore.currentItem.id}`, {
    //   method: 'DELETE'
    // });
    
    // Имитация API вызова
    // при успешном удалении сбросится выбранный элемент в сторе и потом сбросится состояние поиска 
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Имитируем ошибку для демонстрации
        if (Math.random() > 0.7) {
          reject(new Error('Ошибка сервера при удалении'));
        } else {
          resolve(true);
        }
      }, 1000);
    });
    

    console.log('Документ удален:', currentItemStore.currentItem?.name);
    currentItemStore.clearCurrentItem();
    
  } catch (error) {
    console.error('Ошибка при удалении документа:', error);
    
    if (error instanceof Error) {
      deleteError.value = `Ошибка удаления: ${error.message}`;
    } else {
      deleteError.value = 'Произошла неизвестная ошибка при удалении';
    }
  } finally {
    isDeleting.value = false;
  }
};

const retryDelete = () => {
  deleteError.value = null;
  deleteDocument();
};
</script>

<style lang="less" scoped>
main {
  width: 100%;
  flex: 1;
  background-color: #fff;
  display: flex;

  .document-container {
    padding: 30px;
    width: 100%;

    .document-image {
      width: 424px;
      height: 286px;
      overflow: hidden;
      border: 1px solid #E0E0E0;
      float: left;
      margin-right: 60px;
      margin-bottom: 30px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .document-content {
      margin-left: 0;

      .document-header {
        margin-bottom: 20px;
        
        .control {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }
      }

      .delete-error {
        margin: 16px 0;
      }

      .document-description {
        .description-text {
          font-size: 14px;
          color: #6C757D;
          white-space: pre-line;
          line-height: 1.6;
        }
      }
    }

    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }

  .empty-state {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    color: #6C757D;
    font-size: 16px;
  }
}
</style>