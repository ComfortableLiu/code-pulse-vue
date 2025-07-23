<template>
  <h1>二维码生成</h1>
  <div class="workspace">
    <a-form class="form">
      <a-form-item
        label="内容"
        :rules="[{ required: true }]"
      >
        <a-textarea
          v-model:value="content"
          rows="3"
          placeholder="输入要编码的文本、URL等..."
        />
      </a-form-item>

      <a-form-item
        label="尺寸"
        :rules="[{ required: true }]"
      >
        <a-input-number
          disabled
          v-model:value="size"
          min="100"
          max="1000"
        />
      </a-form-item>

      <a-form-item
        label="颜色"
      >
        <div
          style="display: flex;flex-direction: row;gap: 8px;align-items: center;"
        >
          <a-input
            v-model:value="foreground"
            style="width: 150px;"
          />
          <a-input
            type="color"
            v-model:value="foreground"
            style="width: 80px;"
          />
        </div>
      </a-form-item>

      <div class="more-form">
        <a-form-item
          label="边缘空白（%）"
        >
          <a-input-number
            v-model:value="margin"
          />
        </a-form-item>

        <div class="hr-start">
          <div class="line" />
          高级设置
          <div class="line" />
        </div>

        <div class="advanced-settings">
          <a-form-item label="容错等级">
            <a-radio-group v-model:value="level">
              <a-radio-button value="L">L</a-radio-button>
              <a-radio-button value="M">M</a-radio-button>
              <a-radio-button value="Q">Q</a-radio-button>
              <a-radio-button value="H">H</a-radio-button>
            </a-radio-group>
            <template #help>
            <span>
              QR码具有“纠错功能”。即使编码变脏或破损，也可自动恢复数据。调高级别，纠错能力也相应提高，但编码尺寸也也会变大。<a
              href="https://www.qrcode.com/zh/about/error_correction.html" target="_blank">查看详情</a>
            </span>
            </template>
          </a-form-item>

          <a-form-item label="背景颜色" help="普通二维码白色部分的颜色">
            <div
              style="display: flex;flex-direction: row;gap: 8px;align-items: center;"
            >
              <a-input
                v-model:value="background"
                style="width: 150px;"
              />
              <a-input
                type="color"
                v-model:value="background"
                style="width: 80px;"
              />
            </div>
          </a-form-item>

          <a-form-item label="logo设置">
            <a-switch v-model:checked="showImageSettings" />
          </a-form-item>

          <a-form-item label="图片地址" v-show="showImageSettings" :rules="[{ required: showImageSettings }]">
            <a-input
              type="url"
              v-model:value="imageSettings.src"
            />
          </a-form-item>

          <a-form-item label="logo偏移量" v-show="showImageSettings">
            <a-flex gap="middle">
              <a-flex align="center">
                中心对齐：
                <a-switch
                  :checked="imageCenter"
                  @change="(checked: boolean) => {
                      imageSettings.x = checked ? undefined : 0;
                      imageSettings.y = checked ? undefined : 0 ;
                    }"
                />
              </a-flex>
              <a-flex align="center" gap="small">
                X:
                <a-input-number
                  :disabled="imageCenter"
                  v-model:value="imageSettings.x"
                />
                Y:
                <a-input-number
                  :disabled="imageCenter"
                  v-model:value="imageSettings.y"
                />
              </a-flex>
            </a-flex>
          </a-form-item>

          <a-form-item label="logo宽度" v-show="showImageSettings" :rules="[{ required: showImageSettings }]">
            <a-input-number
              v-model:value="imageSettings.width"
            />
          </a-form-item>

          <a-form-item label="logo高度" v-show="showImageSettings" :rules="[{ required: showImageSettings }]">
            <a-input-number
              type="number"
              v-model:value="imageSettings.height"
            />
          </a-form-item>

          <a-form-item label="是否“挖掘”图像周围的模块"
                       help="这意味着嵌入图像重叠的任何模块都将使用背景颜色。使用此选项可确保图像周围的边缘清晰。嵌入透明图像时也很有用。"
                       v-show="showImageSettings">
            <a-switch v-model:checked="imageSettings.excavate" />
          </a-form-item>

          <a-form-item label="启用二维码渐变填充">
            <a-switch v-model:checked="gradient" />
          </a-form-item>

          <a-form-item label="二维码渐变填充类型" v-show="gradient" :rules="[{ required: !!gradient }]">
            <a-radio-group v-model:value="gradientType">
              <a-radio-button value="linear">linear</a-radio-button>
              <a-radio-button value="radial">radial</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item v-show="gradient" label="渐变起始颜色" :rules="[{ required: !!gradient }]">
            <div
              style="display: flex;flex-direction: row;gap: 8px;align-items: center;"
            >
              <a-input
                v-model:value="gradientStartColor"
                style="width: 150px;"
              />
              <a-input
                type="color"
                v-model:value="gradientStartColor"
                style="width: 80px;"
              />
            </div>
          </a-form-item>

          <a-form-item v-show="gradient" label="渐变结束颜色" :rules="[{ required: !!gradient }]">
            <div
              style="display: flex;flex-direction: row;gap: 8px;align-items: center;"
            >
              <a-input
                v-model:value="gradientEndColor"
                style="width: 150px;"
              />
              <a-input
                type="color"
                v-model:value="gradientEndColor"
                style="width: 80px;"
              />
            </div>
          </a-form-item>
        </div>
      </div>
    </a-form>
    <div class="vertical-divider" />
    <div class="qrcode-preview">
      <h2>二维码预览</h2>
      <div class="qrcode-canvas" v-if="content">
        <qrcode-canvas
          ref="qrcode"
          :value="content"
          :size="300"
          :margin="margin"
          :level="level"
          :background="background"
          :foreground="foreground"
          :image-settings="showImageSettings? imageSettings: undefined"
          :gradient="gradient"
          :gradient-type="gradientType"
          :gradient-start-color="gradientStartColor"
          :gradient-end-color="gradientEndColor"
        ></qrcode-canvas>
      </div>

      <div v-if="content">
        <a-button
          @click="downloadQrCode"
          style="display: flex;flex-direction: row;align-items: center;"
        >
          <down-picture theme="outline" size="16" fill="#333" />
          下载二维码
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { type GradientType, type ImageSettings, type Level, QrcodeCanvas } from 'qrcode.vue';
import { DownPicture } from '@icon-park/vue-next'
import { isUndefined } from "@/utils";

// 状态管理
const content = ref('https://example.com');
const size = ref(300);
const qrcode = ref();

const level = ref<Level>('M')
const background = ref('#ffffff')
const foreground = ref('#000000')
const margin = ref(1)

// 是否开启logo设置
const showImageSettings = ref<boolean>(false)

// 可传入二维码图片相关的属性，支持二维码 LOGO；
const imageSettings = ref<ImageSettings>({
  src: '',
  height: 100,
  width: 100,
  excavate: true
})
// logo居中对齐
const imageCenter = computed<boolean>(() => isUndefined(imageSettings.value.x) && isUndefined(imageSettings.value.y))

// 可传入渐变相关的属性，支持渐变：
// 是否开启渐变色
const gradient = ref(false)
const gradientType = ref<GradientType>('linear')
const gradientStartColor = ref('#000000')
const gradientEndColor = ref('#38bdf8')

// 这个东西是为了兼容组件库的一个坑，它不重新展示隐藏一次的话，就不会去重新渲染中心图片
watch([() => imageSettings.value.width, () => imageSettings.value.height, () => imageSettings.value.x, () => imageSettings.value.y, () => imageSettings.value.excavate], () => {
  const src = imageSettings.value.src
  imageSettings.value.src = ''
  setTimeout(() => {
    imageSettings.value.src = src
  })
})

// 下载二维码
const downloadQrCode = () => {
  if (!import.meta.env.SSR) {
    const qrcode = document.querySelector('canvas')
    if (!qrcode) return
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrcode.toDataURL('image/png');
    link.click();
  }
}
</script>

<style scoped>
.workspace {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 48px;
  position: relative;

  .form {
    flex: 1;
  }

  .qrcode-preview {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .vertical-divider {
    height: 100%;
    width: 1px;
    background-color: #333333;
  }
}

.hr-start {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #555;
  gap: 8px;
  margin: 24px 0;

  .line {
    flex: 1;
    background-color: #DDDDDD;
    height: 1px;
  }
}

.qrcode-canvas {
  width: 302px;
  height: 302px;
  border: 1px solid #CCCCCC;
}
</style>
