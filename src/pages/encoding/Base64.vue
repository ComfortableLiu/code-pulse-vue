<template>
  <h1>Base64编码</h1>
  <div class="operation-container">
    <code-editor
      language="text"
      v-model:value="encodingText"
    />
    <div class="btn-group">
      <a-button @click="encodingBase64">
        <arrow-right theme="two-tone" size="24" :fill="['#000' ,'#fff']" />
      </a-button>
      <a-button @click="decodingBase64">
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
import { Base64 } from "js-base64";
import CodeEditor from "@/components/CodeEditor.vue";

// 解码后的文本
const decodingText = ref('')
// 编码后的文本
const encodingText = ref('')

const encodingBase64 = () => {
  decodingText.value = Base64.encode(encodingText.value)
}

const decodingBase64 = () => {
  encodingText.value = Base64.decode(decodingText.value)
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
