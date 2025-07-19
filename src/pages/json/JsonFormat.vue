<template>
  <div class="container">
    <code-editor
      v-model:value="jsonStr"
      language="json"
      show-format
      style="max-height: 300px"
      container-style="margin-top: 24px"
      @format-error="handleFormatError"
    >
      <template #button>
        <a-button class="button" @click="jsonStr=''">清空</a-button>
      </template>
    </code-editor>
    <a-alert
      v-show="formatErrorMessage"
      type="error"
    >
      <template #message>
        <pre>{{ formatErrorMessage }}</pre>
      </template>
    </a-alert>
  </div>
</template>
<script setup lang="ts">
import CodeEditor, { type FormatError } from "@/components/CodeEditor.vue";
import { ref } from "vue";

const jsonStr = ref('')

const formatErrorMessage = ref('')

const handleFormatError = (e?: FormatError) => {
  formatErrorMessage.value = e?.codeFrame || ''
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: var(--page-max-width);
  margin: 0 auto;
  gap: 12px;
}
</style>
