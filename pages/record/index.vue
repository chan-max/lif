<template>
  <div class="p-12 flex gap-8">
    <UButton @click="add"> 增加日常记录 </UButton>
  </div>
</template>
<script setup>
import Api from "@/common/api/axios";

async function add() {
  await Api.createDayrecord();
}
</script>
