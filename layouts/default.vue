<template>
  <AConfigProvider
    :locale="locale == 'zh' ? zhCN : null"
    :theme="{
      token: {
        colorPrimary: '#00fa00',
      },
      algorithm: colorMode == 'dark' ? theme.darkAlgorithm : '',
    }"
  >
    <div class="flex flex-col w-full h-full">
      <!-- Ad Section -->
      <!-- <div class="bg-black text-white py-4">
        <div class="container mx-auto flex justify-between items-center px-4">
          <p class="text-sm">Unlock the secrets of Chinese Mystic Knowledge with us!</p>
          <button
            class="px-3 py-1 bg-white text-black text-xs font-medium rounded hover:bg-gray-200 transition"
            @click="handleSubscribe"
          >
            join now
          </button>
        </div>
      </div> -->

      <Header></Header>

      <div style="flex: 1; margin-top: var(--header)" class="shrink-0 mx-auto w-full min-h-screen">
        <slot></slot>
        <!-- <ContentDoc :path="$route.path" /> -->
      </div>

      <Footer></Footer>
    </div>
  </AConfigProvider>
</template>

<script setup>
import {
  doLoginAction,
  useLoginStatusStore,
  initLoginStoreUserInfo,
  doLogout,
} from "@/common/store/login";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { theme } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { colorMode } from "@/common/index";

const { locale, locales, setLocale } = useI18n();

function handleSubscribe() {
  router.push({ path: "/subscribe" });
}
</script>

<style>
/* html,
body,
#__nuxt {
  height: 100%;
} */
.user-avatar img {
  height: 100%;
}
</style>
