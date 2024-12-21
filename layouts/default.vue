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
    <div class="flex flex-col w-full h-full relative">


      <Header></Header>

      <div
        style=" margin-top: var(--header)"
        class="shrink-0 mx-auto w-full min-h-screen"
      >
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

console.log('default layout loaded')

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


.light {
}

.dark {
  background-color: #0F1017;
}
</style>
