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
    <div class="flex flex-col w-full h-full relative" id="main-div">
      <Header v-if="showHeader"></Header>
      <div
        class="shrink-0 mx-auto w-full min-h-screen z-10"
      >
        <slot></slot>
        <!-- <ContentDoc :path="$route.path" /> -->
      </div>
      <Footer v-if="showFooter"></Footer>
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
console.log("default layout loaded");

const { locale, locales, setLocale } = useI18n();

function handleSubscribe() {
  router.push({ path: "/subscribe" });
}

onMounted(() => {
  particlesJS.load("main-div", "/lib/particles/star.json", function () {
    console.log("callback - particles.js config loaded");
  });
});

const route = useRoute();

// 定义不显示 Header 的页面路径
const noHeaderPages = ["/download"];
const noFooterPages = ["/download"];
const showHeader = !noHeaderPages.includes(route.path);
const showFooter = !noFooterPages.includes(route.path);
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
  background-color: #020617;
}

.particles-js-canvas-el {
  position: absolute;
}
</style>
