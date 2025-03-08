<template>
  <div class="flex flex-col items-center justify-center h-full p-6 text-center">
    <!-- Logo -->
    <img src="/logo.svg" alt="App Logo" class="w-44 h-44 mb-6" />

    <!-- App 介绍 -->
    <p class="text-white/80 text-base leading-relaxed max-w-md mb-6 text-center px-6" style="font-size: 12px;">
      四叶草 是一款AI驱动的智能健康管理工具。
      它通过行为追踪、情绪洞察和运势分析等功能，
      助你深入了解自我、优化生活节奏，找到最适合自己的生活方式。
      我们坚信，健康的身体、愉悦的心情、顺遂的运势以及珍贵的回忆，
      才是人生中最值得珍藏的财富。这也正是四叶草四片叶子所象征的意义。
    </p>

    <!-- 下载按钮 -->
    <a
      href="/clover.apk"
      class="bg-green-500 text-white px-5 py-2 rounded-lg text-base font-medium transition hover:bg-green-600 w-full max-w-xs"
    >
      📲 立即下载 Android 版
    </a>

    <!-- iOS 下载（不可用） -->
    <button
      disabled
      class="bg-white/20 text-white/60 px-5 py-2 rounded-lg text-base font-medium mt-3 w-full max-w-xs cursor-not-allowed"
    >
      🍏 iOS 版本暂未上线
    </button>

    <!-- Web 版本 -->
    <p class="mt-4 text-lg font-semibold text-white">
      也可以访问我们的
      <a
        href="http://thelawofattraction.cn"
        target="_blank"
        class="text-green-400 hover:underline"
      >
        🌍 Web 版
      </a>
    </p>

    <!-- 下载提示 -->
    <p class="mt-2 text-white/60 text-xs">如果下载未开始，请检查浏览器下载权限</p>

    <!-- 作者联系方式 -->
    <div
      class="mt-6 text-white/80 text-sm font-medium select-none transition-transform active:scale-90"
      :class="{ 'text-green-400': copied }"
      @click="copyToClipboard"
    >
      📞 联系作者：<span>187 4253 9196</span>（微信同步）
      <p class="text-xs text-white/60">📋 点击复制</p>
    </div>

    <!-- 标语 -->
    <p class="absolute bottom-6 text-white/50 text-xs w-3/5 leading-relaxed opacity-40" style="font-size: 11px;">
      当岁月流逝，到了生命的尽头，你将什么都带不走，除了那份美好而温馨的回忆。
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const copied = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText("18742539196");
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch (err) {
    console.error("复制失败", err);
  }
};

definePageMeta({
  layout: "bg",
});
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
