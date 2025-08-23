<template>
  <div>
    <docLabel text="Результаты" />
    <div v-if="props.files.length > 0">
      <div class="item-result" v-for="item in props.files">
        <div class="image">
          <img :src="getImg(item.image)"></img>
        </div>
        <div class="description">
          <span class="ame-document font-semibold">{{ item.name }}</span>
          <span class="size-document">12 MB</span>
        </div>
      </div>
    </div>
    <div v-else>
      <span>Ничего не найдено</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// в заявленной апишке нет размера файла
import DocLabel from '../Doc-label.vue';

import type { DocumentList } from '@/types/DocumentList';
import type { PropType } from 'vue';

const props = defineProps({
  files: {
    type: Array as PropType<DocumentList[]>,
    default: () => []
  }
})

const getImg = (img: string | null) => {
  return img !== null ? img : 'src/assest/file.png';
}

</script>

<style lang="less" scoped>
.item-result {
  display: flex;
  flex-direction: row;
  width: 100%;
  // height: 70px;
  background-color: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px #0000001A;

  .image {
    min-width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 10px 0 0 10px;
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
    // padding-top: 20px;
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
}
</style>