<template>
  <div class="about-us-container p-8">
    <h1 class="text-3xl font-bold mb-4">关于 Lif</h1>
    <p class="mb-6 text-lg leading-relaxed">
      欢迎来到
      <strong>Lif</strong>，您值得信赖的在线健康助手。我们的灵感源自北欧神话中的传奇人物
      Lif 和
      Lifthrasir，他们象征着坚韧不拔、重生以及生命的不屈力量。我们的平台旨在帮助您拥抱更健康、更焕然一新的自己。
    </p>

    <h2 class="text-2xl font-semibold mb-4">我们的使命</h2>
    <p class="mb-6 text-lg leading-relaxed">
      在
      Lif，我们的目标是通过提供个性化的指导、工具和见解，帮助每个人掌控自己的健康和福祉。就像
      Lif 和 Lifthrasir
      在旧世界的终结中幸存下来并开启了新世界一样，我们相信无论您的起点如何，我们都可以帮助您重建并维持一个繁荣健康的生活方式。
    </p>

    <h2 class="text-2xl font-semibold mb-4">我们的灵感</h2>
    <p class="mb-6 text-lg leading-relaxed">
      在北欧神话中，Lif 和 Lifthrasir
      象征着生命在逆境中的坚持。他们从诸神黄昏的毁灭中走出，成为新世界的开创者。受他们故事的启发，我们的平台希望成为您在不确定时刻的避风港，引导您迈向健康、活力与新生。
    </p>

    <h2 class="text-2xl font-semibold mb-4">为什么选择 Lif？</h2>
    <ul class="list-disc pl-6 mb-6 text-lg leading-relaxed">
      <li>
        <strong>个性化帮助：</strong>我们的工具和见解会根据您的独特需求和目标进行调整。
      </li>
      <li><strong>全方位关注：</strong>我们专注于您的全面健康，从身体健康到心理韧性。</li>
      <li><strong>赋能于您：</strong>Lif 为您提供知识和支持，让您做出明智的健康决策。</li>
    </ul>

    <h2 class="text-2xl font-semibold mb-4">加入我们</h2>
    <p class="mb-6 text-lg leading-relaxed">
      和
      <strong>Lif</strong>
      一起迈向更健康的未来。无论您是寻求指导、追踪进展，还是探索改善健康的新方法，我们都会在每一步为您提供帮助。让我们一起为您的健康旅程开启新的篇章。
    </p>

    <div class="text-center mt-8">
      <NuxtLink
        to="/contact"
        class="px-6 py-3 bg-primary-500 text-white rounded shadow hover:bg-primary-700"
      >
        联系我们
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "关于我们 - Lif",
  description:
    "了解在线健康助手 Lif 的故事，它受到北欧神话的启发，致力于为您的健康与活力之旅提供支持。",
});
</script>

<style scoped>
.about-us-container {
  max-width: 800px;
  margin: 0 auto;
  color: #333;
}
</style>
