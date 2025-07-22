<template>
  <div>
    <h2>联系我</h2>
    <div class="channel">
      <!-- 微信二维码 -->
      <div class="channel-item">
        <wechat theme="two-tone" size="36" :fill="['#000' ,'#fff']" />
        <img
          class="wechat-qr-code"
          :src="WeChatQRCode"
          alt="微信号：xiaoyaochengjushi "
        >
      </div>
      <!-- GitHub -->
      <div class="channel-item">

        <a
          href="https://github.com/xiaoyaochengjushi"
          target="_blank"
        >
          <github theme="two-tone" size="36" :fill="['#000' ,'#fff']" />
        </a>
        <br>
        <a
          href="https://github.com/xiaoyaochengjushi"
          style="font-size: 22px"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeChatQRCode from "/public/WeChat.jpg";
import { Wechat, Github } from '@icon-park/vue-next'

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

.channel-item {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
