<template>
  <div class="flex text-white">
    <!-- 侧边栏 -->
    <!-- <aside class="w-64 flex flex-col p-6 gap-6 overflow-auto">
      <div class="text-2xl font-semibold text-white mb-2">Zerologic</div>
      <nav class="flex flex-col gap-4">
        <div class="flex items-center gap-3 p-2 rounded-lg bg-[#1E1F29] cursor-pointer">
          <div>🏠</div>
          <span>Dashboard</span>
        </div>
        <div
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#21232F]"
        >
          <div>📦</div>
          <span>Order</span>
        </div>
        <div
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#21232F]"
        >
          <div>👤</div>
          <span>Customer</span>
        </div>
      </nav>
    </aside> -->

    <!-- 主内容区域 -->
    <main class="flex-1 p-6">
      <!-- 左侧大卡片，右侧两个小卡片在同一行 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- 左侧大卡片 -->
        <div class="card card-lg lg:col-span-2">
          <h3 class="text-sm font-semibold mb-8">近一个月睡眠曲线</h3>
          <div class="flex-1 flex items-center justify-center"></div>
        </div>

        <!-- 右侧两个小卡片 -->
        <div class="flex flex-col gap-6">
          <div class="card card-sm">
            <p class="text-gray-400">午睡时长</p>
            <h2 class="text-2xl font-bold">30 分钟</h2>
          </div>
          <div class="card card-sm">
            <p class="text-gray-400">深度睡眠</p>
            <h2 class="text-2xl font-bold">3 小时</h2>
          </div>
        </div>
      </div>
      <!-- 第一行统计卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="card card-sm">
          <p class="text-gray-400">今日睡眠记录</p>
          <h2 class="text-3xl font-bold">245</h2>
        </div>
        <div class="card card-sm">
          <p class="text-gray-400">昨日睡眠时长</p>
          <h2 class="text-3xl font-bold">8 小时</h2>
        </div>
        <div class="card card-sm">
          <p class="text-gray-400">建议睡眠时间</p>
          <h2 class="text-3xl font-bold">7.5 小时</h2>
        </div>
        <div class="card card-sm">
          <p class="text-gray-400">睡眠状态</p>
          <h2 class="text-3xl font-bold">良好</h2>
        </div>
      </div>

      <!-- 第二行 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="card card-lg lg:col-span-2">
          <h3 class="text-sm font-semibold mb-2"></h3>

        </div>
        <div class="card card-lg">
          <h3 class="text-sm font-semibold mb-6">常见食物元素</h3>
          <Chart-FoodBasicCompositionTable></Chart-FoodBasicCompositionTable>
        </div>
      </div>

      <!-- 第三行 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="card card-lg lg:col-span-2">
          <h3 class="text-sm font-semibold mb-2">Top Leader</h3>
          <ul>
            <li class="flex justify-between py-2 border-b border-gray-700">
              <span>Charlie Lubin</span>
              <span class="text-green-400">+2.89%</span>
            </li>
            <li class="flex justify-between py-2 border-b border-gray-700">
              <span>Ruben Levin</span>
              <span class="text-green-400">+2.65%</span>
            </li>
          </ul>
        </div>
        <div class="card card-lg">
          <h3 class="text-sm font-semibold mb-2">常规睡眠时间段分布</h3>
        </div>
      </div>

      <!-- 第五行：横向三个卡片 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="card card-lg">
          <p class="text-gray-400">睡眠质量趋势</p>
          <h2 class="text-2xl font-bold">良好</h2>
        </div>
        <div class="card card-lg">
          <p class="text-gray-400">平均入睡时间</p>
          <h2 class="text-2xl font-bold">23:15</h2>
        </div>
        <div class="card card-lg">
          <p class="text-gray-400">平均起床时间</p>
          <h2 class="text-2xl font-bold">07:30</h2>
        </div>
      </div>

      <!-- 第六行：左侧大卡片，右侧两个小卡片 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="card card-lg lg:col-span-2">
          <h3 class="text-sm font-semibold mb-2">详细睡眠报告</h3>
          <div class="h-48 bg-[#1E1F29] rounded-lg flex items-center justify-center">
            报告内容区域
          </div>
        </div>
        <div class="card card-sm">
          <p class="text-gray-400">午睡时长</p>
          <h2 class="text-2xl font-bold">30 分钟</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="card card-sm">
          <p class="text-gray-400">今日睡眠记录</p>
          <h2 class="text-3xl font-bold">245</h2>
        </div>
        <div class="card card-sm">
          <p class="text-gray-400">昨日睡眠时长</p>
          <h2 class="text-3xl font-bold">8 小时</h2>
        </div>
        <div class="card card-sm">
          <p class="text-gray-400">建议睡眠时间</p>
          <h2 class="text-3xl font-bold">7.5 小时</h2>
        </div>
        <div class="card card-sm">
          <p class="text-gray-400">睡眠状态</p>
          <h2 class="text-3xl font-bold">良好</h2>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Api, { usePromise } from "@/common/api/axios";

const store = reactive({
  today: "2024-12-18",
  yesterday: "",
});
</script>

<style scoped>
/* 基础卡片样式 */
.card {
  @apply bg-gradient-to-br from-[#1E1F29] to-[#2A2D3F] rounded-2xl shadow-xl p-6 flex flex-col justify-between;
}

/* 第一行的卡片高度 */
.card-sm {
  min-height: 180px;
}

@media (min-width: 1280px) {
  .card-sm {
    min-height: 220px;
  }
}

/* 第二行、第五行的卡片高度 */
.card-lg {
  min-height: 240px;
}

@media (min-width: 1280px) {
  .card-lg {
    min-height: 300px;
  }
}
</style>
