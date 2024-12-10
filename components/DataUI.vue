<template>
  <VueDataUi v-bind="$attrs" :key="key">
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name v-bind="slotData || {}"></slot>
    </template>
  </VueDataUi>
</template>

<script setup>
import { colorMode } from "@/common/index";

const key = ref(0);

watch(colorMode, (val) => {
  nextTick(() => {
    key.value += 1;
  });
});
</script>
