<template>
  <div class="p-12">
    <div>{{ now }}</div>
    <button> 记录睡眠 </button>

    <button> 记录饮食 </button>

    <button> 记录零食 </button>
  </div>
</template>

<script setup>
import { useNow } from "@vueuse/core";

let now = useNow();
</script>
