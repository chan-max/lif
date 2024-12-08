<template>
  <footer :class="[ 'py-4']">
    <div
      class="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 space-y-4 md:space-y-0"
    >
      <!-- Footer Logo and Description -->
      <div class="text-center md:text-left">
        <h2 class="text-lg font-bold">Lif Health Assistant</h2>
        <p class="text-xs mt-1">
          Supporting your journey to better health with AI-powered solutions.
        </p>
      </div>

      <!-- Footer Navigation -->
      <nav class="flex flex-wrap justify-center md:justify-end space-x-4">
        <NuxtLink to="/features" class="footer-link">Features</NuxtLink>
        <NuxtLink to="/resources" class="footer-link">Resources</NuxtLink>
        <NuxtLink to="/support" class="footer-link">Support</NuxtLink>
        <NuxtLink to="/contact" class="footer-link">Contact Us</NuxtLink>
      </nav>
    </div>

    <!-- Footer Copyright -->
    <div class="border-t mt-4 pt-3 text-center">
      <p class="text-xs">
        &copy; 2024 Lif Health Assistant. All rights reserved.
      </p>
      <p class="text-xs mt-1">
        Built with passion to help you thrive.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

</script>

<style scoped>
/* 通用样式 */
footer {
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 0.875rem; /* 调整整体字体大小 */
}

.container {
  max-width: 1200px;
}

.footer-link {
  text-decoration: none;
  font-weight: 500;
  font-size: 0.75rem; /* 小文字尺寸 */
  transition: color 0.3s ease;
}

/* 白天模式样式 */
.light {
  background-color: #ffffff;
  color: #2d3748; /* 深灰文字 */
  border-color: #e2e8f0;
}

.light h2 {
  color: #1a202c; /* 深灰标题 */
}

.light p {
  color: #718096; /* 中灰正文 */
}

.light .footer-link {
  color: #4a5568; /* 链接颜色 */
}

.light .footer-link:hover {
  color: #2d3748; /* 深灰悬停效果 */
}

.light .border-t {
  border-color: #e2e8f0;
}

/* 夜间模式样式 */
.dark {
  background-color: #000000; /* 黑色背景 */
  color: #e2e8f0; /* 浅灰文字 */
  border-color: #374151;
}

.dark h2 {
  color: #f9fafb; /* 亮白标题 */
}

.dark p {
  color: #9ca3af; /* 中灰正文 */
}

.dark .footer-link {
  color: #9ca3af; /* 链接颜色 */
}

.dark .footer-link:hover {
  color: #f3f4f6; /* 浅灰悬停效果 */
}

.dark .border-t {
  border-color: #4a5568;
}

/* 字体大小调整 */
.text-xs {
  font-size: 0.75rem; /* 小字体 */
}
</style>
