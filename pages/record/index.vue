<template>
  <div class="p-12 flex gap-4">
    <UButton @click="init"> 初始化日常记录 </UButton>
    <UButton @click="addRecordDetail"> 增加记录 </UButton>

    <UButton @click="recordSleep"> 记录睡眠 </UButton>

    <UButton @click="$router.push({ path: '/record/today' })"> 查看我的今日记录 </UButton>

    <UButton> 查看我的历史记录 </UButton>
  </div>
</template>
<script setup>
import Api from "@/common/api/axios";

async function init() {
  await Api.createDayrecord();
}

async function getDayrecord() {
  let res = await Api.getDayrecord();
  console.log(res);
}

getDayrecord();

async function addRecordDetail() {
  await Api.addRecordDetail({});
}

async function recordSleep() {
  // 记录睡眠
  await Api.addRecordDetail({});
}
</script>
