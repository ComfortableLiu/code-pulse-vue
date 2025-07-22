<template>
  <h1>URL编码</h1>
  <div class="operation-container">
    <code-editor
      language="text"
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
    <code-editor
      language="text"
      v-model:value="decodingText"
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ArrowLeft } from '@icon-park/vue-next'
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

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
</style>
