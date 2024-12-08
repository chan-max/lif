<template>
  <div class="markdown-body p-6"><ContentDoc :path="$route.query.path"></ContentDoc></div>
</template>

<script>
let route = useRoute();
</script>
