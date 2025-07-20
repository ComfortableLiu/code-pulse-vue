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
        <a-button
          class="button"
          type="primary"
          @click="transformTypescript"
        >
          转换
        </a-button>
<!--        <a-checkbox>-->
<!--          需要分号-->
<!--        </a-checkbox>-->
<!--        <a-checkbox>-->
<!--          添加导出-->
<!--        </a-checkbox>-->
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

    <code-editor
      ref="tsEditorRef"
      v-model:value="typescriptStr"
      language="typescript"
      show-format
      style="max-height: 300px"
    />
  </div>
</template>
<script setup lang="ts">
import CodeEditor, { type CodeEditorInstance, type FormatError } from "@/components/CodeEditor.vue";
import { ref } from "vue";
import type { IAnyObj } from "@/utils/type.ts";

// json内容
const jsonStr = ref('')
const typescriptStr = ref('')
// 持有ts组件的ref，为了调用其格式化代码
const tsEditorRef = ref<CodeEditorInstance>()

const formatErrorMessage = ref('')

const handleFormatError = (e?: FormatError) => {
  formatErrorMessage.value = e?.codeFrame || ''
}

const handle = (obj: IAnyObj, name: string) => {
  const t: IAnyObj = {}
  const list: { obj: IAnyObj, name: string }[] = []
  Object.keys(obj || []).forEach(key => {
    // 将key，按照key中的非字母数字的所有字符进行切分
    // 为了处理字符串的特殊情况，比如"@abc/def_123:4.5.66-qqq"，需要处理成"IAbcDef1234566Qqq"
    const keyStr = key.split(/[^A-Za-z0-9]/)
      .filter(Boolean)
      .map((key, index) => index > 0 ? key.charAt(0).toUpperCase() + key.slice(1) : key)
      .join('') || 'unknownName'

    // 处理非对象
    if (typeof obj[key] !== 'object') {
      t[keyStr] = typeof obj[key]
      return
    }

    // 处理对象
    t[keyStr] = `I${keyStr.charAt(0).toUpperCase() + keyStr.slice(1)}`
    if (Array.isArray(obj[key])) {
      if (obj[key].length === 0) {
        t[keyStr] = 'any[]'
        return
      } else if (typeof obj[key][0] !== 'object') {
        t[keyStr] = typeof obj[key][0] + '[]'
        return
      } else {
        t[keyStr] += '[]'
      }
    }
    list.push({
      obj: Array.isArray(obj[key]) ? obj[key][0] : obj[key],
      name: keyStr,
    })
  })
  return {
    list,
    str: `interface I${name.charAt(0).toUpperCase() + name.slice(1)} {\n${Object.keys(t).map(key => `  ${key}: ${t[key]}`).join('\n')}\n}\n\n`,
  }
}

const transformTypescript = () => {
  let ans = ''
  const obj = JSON.parse(jsonStr.value)
  const list = []
  list.push({
    obj,
    name: 'root',
  })
  while (list.length) {
    const item = list.shift()!
    const { list: newList, str } = handle(item.obj, item.name)
    ans += str
    // 将所有newList里面的元素添加到list里面
    newList.forEach(item => list.push(item))
  }
  typescriptStr.value = ans
  setTimeout(() => tsEditorRef.value?.doFormatCode?.())
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
