<template>
  <div
    class="container"
    :style="props.containerStyle"
  >
    <div
      ref="editorContainer"
      class="editor"
      :style="props.style"
    />
    <div class="extension-action">
      <a-button
        v-if="props.showFormat"
        @click="doFormatCode"
      >
        格式化
      </a-button>
      <slot name="button" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, onMounted, onUnmounted, ref, watch } from "vue";
import { basicSetup, EditorView } from "codemirror";
import { formatCode } from "@/components/format-utils.ts";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import { markdown } from "@codemirror/lang-markdown";
import { css } from "@codemirror/lang-css";
import { LanguageSupport } from "@codemirror/language";
import { autocompletion } from "@codemirror/autocomplete"
import { EditorSelection, EditorState, StateEffect, StateField } from "@codemirror/state";
import { Decoration } from "@codemirror/view";
import type CodeEditor from "@/components/CodeEditor.vue";

type CodeType = 'css' | 'html' | 'javascript' | 'typescript' | 'json' | 'markdown' | 'text'

export type CodeEditorInstance = InstanceType<typeof CodeEditor>;

interface ICodeEditorProps {
  value: string
  language: CodeType
  style?: CSSProperties
  containerStyle?: string
  showFormat?: boolean
}

export interface FormatError {
  loc: {
    start: {
      line: number,
      column: number
    }
  },
  cause: {
    code: string,
    reasonCode: string,
    loc: {
      line: number,
      column: number,
      index: number
    },
    pos: number
  },
  codeFrame: string
}

const langConfig: {
  [key in CodeType]: {
    extension?: LanguageSupport,
    format: 'babel' | 'json' | 'html' | 'css' | 'markdown' | 'text' | 'typescript'
  }
} = {
  javascript: {
    extension: javascript({
      typescript: false,
      jsx: true
    }),
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
  },
  typescript: {
    extension: javascript({
      typescript: true,
      jsx: true
    }),
    format: 'typescript'
  }
}

const props = defineProps<ICodeEditorProps>()
const emit = defineEmits([
  'update:value',
  'formatError',
])

const editorContainer = ref(null)
let editorView: EditorView

const code = ref(props.value)

// 定义添加和移除高亮的状态效果
const addHighlight = StateEffect.define({
  map: (range, change) => range.map(change)
})

const removeHighlight = StateEffect.define()

// 创建管理高亮装饰的状态字段
const highlightField = StateField.define({
  create() {
    return Decoration.none
  },
  update(deco, tr) {
    // 处理添加和移除高亮的效果
    deco = deco.map(tr.changes)
    for (const effect of tr.effects) {
      if (effect.is(addHighlight)) {
        deco = deco.update({ add: [effect.value] })
      } else if (effect.is(removeHighlight)) {
        deco = Decoration.none
      }
    }
    return deco
  },
  provide: (f) => EditorView.decorations.from(f)
})

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
        }),
        highlightField,
        autocompletion({
          activateOnTyping: true,
          maxRenderedOptions: 20,
          defaultKeymap: true,
        }),
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
    const currentText = editorView.state.doc.toString()
    const formattedText = await formatCode(currentText, langConfig[props.language].format)
    editorView.dispatch({
      changes: { from: 0, to: currentText.length, insert: formattedText }
    })
    emit('formatError', undefined)
  } catch (e) {
    const line = (e as FormatError).loc.start.line
    handle(line)
    emit('formatError', e)
  }
}

// 高亮报错行
const handle = (line: number) => {
  if (line === 0) {
    editorView.dispatch({
      effects: removeHighlight.of(null)
    })
    return
  }
  const lineObj = editorView.state.doc.line(line)
  const highlightTheme = Decoration.line({
    attributes: {
      style: 'background-color: rgb(255, 229, 224)'
    }
  })
  const deco = highlightTheme.range(lineObj.from)

  editorView.dispatch({
    effects: [
      addHighlight.of(deco),
      EditorView.scrollIntoView(EditorSelection.range(editorView.state.doc.line(line).from, editorView.state.doc.line(line).to)),
    ]
  })
}

defineExpose({
  doFormatCode
})

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
  margin-top: 6px;
}

.extension-action {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
