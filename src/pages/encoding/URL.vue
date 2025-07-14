<template>
  <div class="container">
    <h1>URL编码</h1>
    <div class="operation-container">
      <a-textarea
        allowClear
        showCount
        style="flex: 1"
        placeholder="想要编码的文字"
        rows="10"
        v-model:value="encodingText"
      />
      <div class="btn-group">
        <a-button @click="encodeURL">
          <arrow-right theme="two-tone" size="24" :fill="['#000' ,'#fff']" />
        </a-button>
        <a-button @click="decodeURL">
          <arrow-left theme="two-tone" size="24" :fill="['#000' ,'#fff']" />
        </a-button>
      </div>
      <a-textarea
        allowClear
        showCount
        style="flex: 1"
        placeholder="编码后的文字"
        rows="10"
        v-model:value="decodingText"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowLeft } from '@icon-park/vue-next'
import { ref } from "vue";

// 解码后的文本
const decodingText = ref('')
// 编码后的文本
const encodingText = ref('')

const encodeURL = () => {
  decodingText.value = encodeURIComponent(encodingText.value)
}

const decodeURL = () => {
  encodingText.value = decodeURIComponent(decodingText.value)
}

</script>

<style scoped>
.container {
  max-width: var(--page-max-width);
  margin: 0 auto;

  .operation-container {
    display: flex;
    flex-direction: row;
    gap: 12px;

    .btn-group {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      gap: 12px;
    }
  }
}
</style>
