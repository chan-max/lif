<template>
  <div class="p-12">
    <h3>记录身高</h3>
    <div class="space-x-6 flex">
      <div style="flex: 1">
        <UInput
          placeholder="输入你的身高"
          size="xl"
          type="number"
          max="250"
          min="50"
          v-model="height"
        >
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">cm</span>
          </template>
        </UInput>
      </div>

      <div><UButton size="xl" @click="init" :loading="loading"> 添加记录 </UButton></div>
    </div>
  </div>
</template>

<script setup>
import Api from "@/common/api/axios";
import { usePromise } from "@/common/hooks/promise";

const height = ref();

const { error, loading, init } = usePromise(() => {
  return Api.addDayrecordDetail({
    type: "height",
    height: height.value,
  });
});
</script>
