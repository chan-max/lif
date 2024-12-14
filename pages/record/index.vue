<template>
  <div class="p-12 flex gap-4">
    <UButton @click="init"> 初始化日常记录 </UButton>
    <UButton @click="addDayrecordDetail"> 增加记录 </UButton>

    <UButton @click="recordSleep"> 记录睡眠 </UButton>

    <UButton @click="recordSleep"> 记录睡眠 </UButton>

    <UButton @click="recordHeight"> 记录身高 </UButton>

    <UButton @click="recordWeight"> 记录体重 </UButton>

    <UButton @click="$router.push({ path: '/record/day/today' })">
      查看我的今日记录
    </UButton>

    <UButton @click="$router.push({ path: '/record/list' })"> 查看我的记录 </UButton>
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

async function addDayrecordDetail() {
  await Api.addDayrecordDetail({});
}

async function recordSleep() {
  // 记录睡眠
  await Api.addDayrecordDetail({});
}
</script>
