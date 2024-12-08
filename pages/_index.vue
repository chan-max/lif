<template>
  <div class="flex items-center justify-center h-full">
    <div class="flex flex-wrap justify-center gap-4 max-w-5xl">
      <!-- Render links -->
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-custom-400 hover:text-custom-500 hover:scale-105 transition text-md font-medium underline"
      >
        {{ link.label }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Generate 100 links dynamically
const links = ref([
  {
    label: "身体质量指数BMI",
    link: "/bmi",
  },
]);
</script>

<style scoped>
/* Adjust styles for compact display */

.flex-wrap {
  word-wrap: break-word; /* Allow wrapping for long links */
}
</style>
