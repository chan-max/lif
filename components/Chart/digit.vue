<template>
  <VueDataUi component="VueUiDigits" :config="config" :dataset="value"> </VueDataUi>
</template>

<script setup>
const props = defineProps({
  value: {
    default: 0,
  },
});

const config = ref({
  height: "100%",
  width: null,
  backgroundColor: "transparent",
  digits: { color: "#00fa00", skeletonColor: "#e1e5e8" },
});
</script>
