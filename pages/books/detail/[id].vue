<template>
  <div class="min-h-screen bg-opacity-90 py-8">
    <div class="container mx-auto px-4">detail {{ id }}</div>
  </div>
</template>

<script setup>
import { books } from "../books"; // Example data import
import { useRoute } from "vue-router";

definePageMeta({
  //   layout: true, // 禁用布局
});

let route = useRoute();
let id = route.params.id;
</script>
<style></style>
