<template>
  <div>
    <h2>联系我</h2>
    <div class="channel">
      <!-- 微信二维码 -->
      <div class="channel-item">
        <a-tooltip color="#FFFFFF">
          <wechat theme="outline" size="36" fill="#000" />
          <template #title>
            <img
              alt="wechat"
              :src="WeChatQRCode"
              height="408"
              width="300"
            />
          </template>
        </a-tooltip>
      </div>
      <!-- GitHub -->
      <div class="channel-item">
        <a
          href="https://github.com/xiaoyaochengjushi"
          target="_blank"
        >
          <github theme="outline" size="36" fill="#000" />
        </a>
      </div>
      <!-- Email -->
      <div class="channel-item">
        <a
          href="mailto:liuchengxu1994@gmail.com"
          target="_blank"
        >
          <mail class="icon" theme="outline" size="36" fill="#000000" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeChatQRCode from "/public/WeChat.png";
import { Wechat, Github, Mail } from '@icon-park/vue-next'

</script>

<style scoped>
.wechat-qr-code {
  width: 200px;
}

.channel {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
</style>
