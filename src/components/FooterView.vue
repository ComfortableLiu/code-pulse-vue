<template>
  <div class="footer">
    <div class="content">
      <div class="info-container">
        <div class="contact-me">
          <span>联系我：</span>
          <a href="mailto:liuchengxu1994@gmail.com" target="_blank">
            <mail class="icon" theme="outline" size="18" fill="#FFFFFF" />
          </a>
          <a href="https://github.com/ComfortableLiu/code-pulse-vue" target="_blank">
            <github class="icon" theme="outline" size="18" fill="#FFFFFF" />
          </a>
          <a href="weixin://dl/chat">
            <a-tooltip color="#FFFFFF">
              <template #title>
                <img
                  alt="微信号：xiaoyaochengjushi"
                  :src="WeChatQRCode"
                  height="272"
                  width="200"
                />
              </template>
              <wechat class="icon" theme="outline" size="18" fill="#FFFFFF" />
            </a-tooltip>
          </a>
        </div>
        <div>
          声明：本网站部分工具是站长整合网上已有工具、开源包等，并全部遵循原有协议发布，著作权归属原作者或是团队。如有问题请联系站长。
        </div>
      </div>
      <div class="logo-image">
        <img
          alt="icon"
          :src="icon"
          height="80"
          width="80"
        />
        <div class="title">Code Pulse</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import icon from '../../public/logo-w.png'
import WeChatQRCode from '../../public/WeChat.png'
import { Mail, Github, Wechat } from '@icon-park/vue-next'
</script>
<style scoped>
.footer {
  display: flex;
  width: 100%;
  background-color: #353535;
  padding: 24px 0;

  .content {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    justify-content: center;
    max-width: var(--page-max-width);
    width: 100%;

    .info-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      color: #CCCCCC;

      .contact-me {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #FFFFFF;
      }
    }

    .logo-image {
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      justify-content: center;

      .title {
        color: #FFFFFF;
        font-size: 28px;
        font-weight: bolder;
      }
    }
  }
}

.icon {
  display: flex;
}
</style>
