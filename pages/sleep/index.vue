<template>
  <div class="flex h-screen text-white">
    <!-- 侧边栏 -->
    <aside class="w-64 flex flex-col p-10 gap-6 bg-[#12131C] overflow-auto">
      <!-- Logo -->
      <div class="text-2xl font-semibold text-white mb-4">Zerologic</div>

      <!-- 导航菜单 -->
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
        <div
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#21232F]"
        >
          <div>📊</div>
          <span>Balance</span>
        </div>
      </nav>

      <!-- 设置 -->
      <div class="mt-auto">
        <div
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#21232F]"
        >
          <div>⚙️</div>
          <span>Settings</span>
        </div>
      </div>
    </aside>

    <!-- 主内容区域 -->
    <main class="flex-1 p-6">
      <!-- 顶部统计卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#252736] p-4 rounded-2xl shadow-xl"
        >
          <p class="text-gray-400">今日睡眠记录</p>
          <h2 class="text-2xl font-bold">245</h2>
        </div>
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#27293D] p-4 rounded-2xl shadow-xl"
        >
          <p class="text-gray-400">昨日睡眠时长</p>
          <h2 class="text-2xl font-bold">1,450,665</h2>
        </div>
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#313447] p-4 rounded-2xl shadow-xl"
        >
          <p class="text-gray-400">我的建议睡眠时间</p>
          <h2 class="text-2xl font-bold">1,778,776</h2>
        </div>
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#2A2D3F] p-4 rounded-2xl shadow-xl"
        >
          <p class="text-gray-400">昨日睡眠状态</p>
          <h2 class="text-2xl font-bold">$ 455.098K</h2>
        </div>
      </div>

      <!-- 图表和详细卡片 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- 图表区域 -->
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#2A2D3F] rounded-2xl p-6 col-span-2 shadow-xl"
        >
          <h3 class="text-lg font-semibold mb-4">Sales Statistic</h3>
          <div class="h-40 bg-[#1E1F29] rounded-lg flex items-center justify-center">
            <span>图表区域</span>
          </div>
        </div>

        <!-- 账户余额 -->
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#313447] rounded-2xl p-6 shadow-xl"
        >
          <h3 class="text-lg font-semibold mb-4">Account Balance</h3>
          <div class="text-3xl font-bold mb-2">$ 1,450,665</div>
          <p class="text-gray-400">Balance</p>
        </div>
      </div>

      <!-- 表格和通知区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Top Leader -->
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#27293D] rounded-2xl p-6 col-span-2 shadow-xl"
        >
          <h3 class="text-lg font-semibold mb-4">Top Leader</h3>
          <ul>
            <li class="flex justify-between py-2 border-b border-gray-700">
              <span>Charlie Lubin</span>
              <span class="text-green-400">+2.89%</span>
            </li>
            <li class="flex justify-between py-2 border-b border-gray-700">
              <span>Ruben Levin</span>
              <span class="text-green-400">+2.65%</span>
            </li>
            <li class="flex justify-between py-2">
              <span>Alfredo George</span>
              <span class="text-green-400">+1.90%</span>
            </li>
          </ul>
        </div>

        <!-- 消息通知 -->
        <div
          class="bg-gradient-to-br from-[#1E1F29] to-[#252736] rounded-2xl p-6 shadow-xl"
        >
          <h3 class="text-lg font-semibold mb-4">Message Box</h3>
          <ul>
            <li class="flex justify-between py-2 border-b border-gray-700">
              <span>Paityn Herwitz</span>
              <span class="text-gray-400 text-sm">Just now</span>
            </li>
            <li class="flex justify-between py-2 border-b border-gray-700">
              <span>Gretchen George</span>
              <span class="text-gray-400 text-sm">20 min</span>
            </li>
            <li class="flex justify-between py-2">
              <span>Ashlynn Schleifer</span>
              <span class="text-gray-400 text-sm">2 days</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 逻辑部分
import Api, { usePromise } from "@/common/api/axios";
import { getPreviousDay, getDayRecordDateKey } from "@/common/date";
const { data, init } = usePromise(() => {
  return Api.getDayrecord(getDayRecordDateKey());
});

init();
</script>

<style scoped>
/* 可根据需求添加自定义样式 */
</style>
