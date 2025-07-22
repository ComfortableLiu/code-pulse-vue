<template>
  <h1>SHA加密</h1>
  <div class="operation-container">
    <code-editor
      language="text"
      v-model:value="originalText"
    />
    <div class="btn-group">
      <a-button
        v-for="operation in SHAOperationList"
        :key="operation.name"
        type="primary"
        @click="operation.fun"
      >
        {{ operation.name }}
      </a-button>
    </div>
    <br>

    <a-input v-model:value="keyText" addon-before="HMAC-SHA密钥" />
    <div class="btn-group">
      <a-button
        v-for="operation in hmacSHAOperationList"
        :key="operation.name"
        type="primary"
        @click="operation.fun"
      >
        {{ operation.name }}
      </a-button>
    </div>
    <code-editor
      language="text"
      v-model:value="cipherText"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

interface ISHAOperationItem {
  name: string
  fun: () => void
}

// 原文
const originalText = ref('')
// 密文
const cipherText = ref('')
// 给HMAC加密用的密钥
const keyText = ref('')

// 普通SHA加密
const sha = async (originalStr: string, name: '1' | '256' | '512') => {
  // 使用Web Crypto API实现SHA1加密
  const hash = await crypto.subtle
    .digest(`SHA-${name}`, new TextEncoder().encode(originalStr))
  const hashArray = Array.from(new Uint8Array(hash))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// HMAC-SHA加密
const hmacSHA = async (originalText: string, name: '1' | '256' | '512', key: string) => {
  const encoder = new TextEncoder();

  // 导入密钥
  const keyStr = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: `SHA-${name}` },
    false,
    ['sign']
  );

  // 签名
  const signature = await crypto.subtle.sign(
    'HMAC',
    keyStr,
    encoder.encode(originalText)
  );

  // 转换为十六进制字符串
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// 普通SHA加密操作集合
const SHAOperationList = ref<ISHAOperationItem[]>([{
  name: 'SHA 1',
  fun: async (originalStr: string) => sha(originalStr, '1')
}, {
  name: 'SHA 256',
  fun: async (originalStr: string) => sha(originalStr, '256')
}, {
  name: 'SHA 512',
  fun: async (originalStr: string) => sha(originalStr, '512')
}].map(item => ({
  name: item.name,
  fun: async () => cipherText.value = await item.fun(originalText.value)
})))

// 普通SHA加密操作集合
const hmacSHAOperationList = ref<ISHAOperationItem[]>([{
  name: 'HMAC-SHA 1',
  fun: async (originalStr: string, key: string) => hmacSHA(originalStr, '1', key)
}, {
  name: 'HMAC-SHA 256',
  fun: async (originalStr: string, key: string) => hmacSHA(originalStr, '256', key)
}, {
  name: 'HMAC-SHA 512',
  fun: async (originalStr: string, key: string) => hmacSHA(originalStr, '512', key)
}].map(item => ({
  name: item.name,
  fun: async () => cipherText.value = await item.fun(originalText.value, keyText.value)
})))

</script>

<style scoped>
.operation-container {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .btn-group {
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
}
</style>
