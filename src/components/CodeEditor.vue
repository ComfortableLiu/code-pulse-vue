<template>
  <div
    class="container"
    :style="props.containerStyle"
  >
    <a-button
      v-if="props.showFormat"
      @click="doFormatCode"
    >
      格式化
    </a-button>
    <div
      ref="editorContainer"
      class="editor"
      :style="props.style"
    />
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, onMounted, onUnmounted, ref, watch } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { formatCode } from "@/components/format-utils.ts";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { css } from "@codemirror/lang-css";

type CodeType = 'css' | 'html' | 'javascript' | 'json' | 'markdown' | 'text'

interface ICodeEditorProps {
  value: string
  language: CodeType
  style?: CSSProperties
  containerStyle?: CSSProperties
  showFormat?: boolean
}

const langConfig = {
  javascript: {
    extension: javascript(),
    format: 'babel'
  },
  json: {
    extension: json(),
    format: 'json'
  },
  html: {
    extension: html(),
    format: 'html'
  },
  css: {
    extension: css(),
    format: 'css'
  },
  markdown: {
    extension: markdown(),
    format: 'markdown'
  },
  text: {
    extension: undefined,
    format: 'text'
  }
}

const props = defineProps<ICodeEditorProps>()
const emit = defineEmits(['update:value'])

const editorContainer = ref(null)
let editorView: EditorView

const code = ref(props.value)

// 初始化编辑器
onMounted(() => {
  editorView = new EditorView({
    state: EditorState.create({
      doc: props.value || '',
      extensions: [
        basicSetup,
        langConfig[props.language].extension,
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            code.value = update.state.doc.toString()
            emit('update:value', code.value)
          }
        })
      ].filter(a => !!a)
    }),
    parent: editorContainer.value!
  })
})

// 监听外部传入的代码变化
watch(() => props.value, (newValue) => {
  if (newValue !== code.value && editorView) {
    const transaction = editorView.state.update({
      changes: { from: 0, to: editorView.state.doc.length, insert: newValue }
    })
    editorView.dispatch(transaction)
  }
})

// 格式化代码
const doFormatCode = async () => {
  if (!editorView) return
  try {
    const currentText = editorView.state.doc.toString();
    const formattedText = await formatCode(currentText);
    editorView.dispatch({
      changes: { from: 0, to: currentText.length, insert: formattedText }
    });
  } catch (e) {
    // alert('代码格式错误，无法自动格式化')
    console.error(e)
  }
}

// 组件销毁时清理
onUnmounted(() => {
  if (editorView) {
    editorView.destroy()
  }
})
</script>

<style scoped>
.container {
  flex: 1;
  min-height: 300px;
  width: 100%;
}

.editor {
  width: 100%;
  min-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
