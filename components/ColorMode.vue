<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { nextTick } from "vue";
import { colorMode } from "@/common/index";

// 切换模式
const setColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};

// 判断是否支持 startViewTransition API
const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

// 切换动画
async function toggleDark({ clientX: x, clientY: y }: MouseEvent) {
  const isDark = colorMode.value === "dark";

  if (!enableTransitions()) {
    setColorMode();
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    setColorMode();
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: !isDark ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${!isDark ? "old" : "new"}(root)`,
    }
  );
}

// 初始化页面时设置主题
if (colorMode.value === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// 监听 colorMode 变化，动态更新 DOM 的 class
watch(colorMode, (newMode) => {
  if (newMode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <Icon
    @click="toggleDark"
    :name="colorMode === 'dark' ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
    class="h-5 w-5 cursor-pointer"
  />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
