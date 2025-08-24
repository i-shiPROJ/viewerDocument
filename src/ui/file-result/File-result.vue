<template>
  <div>
    <docLabel text="Результаты" />
    <div v-if="props.files.length > 0">
      <div class="item-result" v-for="item in props.files">
        <div class="image">
          <img :src="getImg(item.image)" :alt="item.name" />
        </div>
        <div class="description" :class="{ 'description-current': item.current }" @click="currentItem(item)">
          <span class="name-document font-semibold">{{ item.name }}</span>
          <span class="size-document">12 MB</span>
        </div>
      </div>
    </div>
    <div v-else-if="props.files.length === 0 && props.hasError">
      <div class="error-state">
        <span>Ошибка загрузки результатов</span>
      </div>
    </div>
    <div v-else>
      <span>Ничего не найдено</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import DocLabel from '../Doc-label.vue';
import type { DocumentList } from '@/types/DocumentList';
import type { PropType } from 'vue';
import { useCurrentItemStore } from '@/stores/CurrenItem';

const currentItemStore = useCurrentItemStore();

const props = defineProps({
  files: {
    type: Array as PropType<DocumentList[]>,
    default: () => []
  },
  hasError: {
    type: Boolean,
    default: false
  }
});

const getImg = (img: string | null) => {
  return img !== null ? img : 'src/assest/file.png';
};

const currentItem = (currentItem: DocumentList) => {
  props.files.forEach((item: DocumentList) => {
    if (item.id == currentItem.id) {
      item.current = true;
      currentItemStore.setCurrentItem(item);
    } else {
      item.current = false;
    }
  });
};
</script>

<style lang="less" scoped>
.item-result {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px #0000001A;

  .image {
    min-width: 70px;
    height: 70px;
    overflow: hidden;
    border-right: 1px solid #E0E0E0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .description {
    padding: 15px 15px;
    width: 100%;
    display: flex;
    flex-direction: column;

    .name-document {
      font-size: 16px;
    }

    .size-document {
      margin-top: 3px;
      font-size: 14px;
      color: #6C757D;
    }

    span {
      width: 100%;
      display: block;
    }
  }

  .description:hover {
    cursor: pointer;
    background-color: #0D6EFD;
    color: #fff;

    .size-document {
      color: #fff;
    }
  }

  .description-current {
    cursor: pointer;
    background-color: #0D6EFD;
    color: #fff;

    .size-document {
      color: #fff;
    }
  }
}

.error-state {
  text-align: center;
  padding: 20px;
  color: #dc2626;
  font-style: italic;
}
</style>