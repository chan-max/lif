<template>
  <div class="tabs-container" ref="tabsContainer">
    <div class="tabs flex gap-4 py-4">
      <div
        class="tab-item relative flex items-center justify-center gap-2 px-6 py-2 cursor-pointer transition-transform ease-in-out duration-300"
        v-for="(item, index) in items"
        :key="index"
        :class="{
          'activ transform scale-125 -translate-y-1.5 font-bold':
            modelValue === item.type,
        }"
        @click="selectTab(index, item.type)"
        :ref="(el) => (tabRefs[index] = el)"
      >
        <img v-if="item.logo" :src="item.logo" alt="tab-logo" class="tab-logo w-6 h-6" />
        <span class="tab-label text-sm font-medium">{{ item.label }}</span>
        <div
          v-if="modelValue === item.type"
          class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-green-400 rounded-full transition-all duration-300"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: String, // 当前激活的 tab
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const tabsContainer = ref(null); // 容器引用
const tabRefs = ref([]); // 每个 Tab 的引用

const selectTab = (index, type) => {
  emit("update:modelValue", type);
  scrollToCenter(index);
};

const scrollToCenter = (index) => {
  const container = tabsContainer.value;
  const targetTab = tabRefs.value[index];
  if (container && targetTab) {
    const containerRect = container.getBoundingClientRect();
    const tabRect = targetTab.getBoundingClientRect();

    const offset = tabRect.left - containerRect.left + tabRect.width / 2;
    const scrollTo = offset - containerRect.width / 2;

    container.scrollLeft += scrollTo;
  }
};
</script>

<style scoped>
/* 自定义滚动条样式 */
.tabs-container {
  overflow-x: auto; /* 允许横向滚动 */
  white-space: nowrap; /* 禁止换行 */
  -webkit-overflow-scrolling: touch; /* 移动端平滑滚动 */
  scrollbar-width: thin; /* Firefox 优化滚动条宽度 */
  scroll-behavior: smooth; /* CSS 平滑滚动 */
  scrollbar-color: rgba(100, 100, 100, 0.5) transparent;
}

.tabs-container::-webkit-scrollbar {
  height: 6px; /* 滚动条高度 */
}

.tabs-container::-webkit-scrollbar-thumb {
  background: #00fa00; /* 滚动条颜色 */
  border-radius: 4px; /* 滚动条圆角 */
}

.tabs-container::-webkit-scrollbar-track {
  background: transparent; /* 滚动条轨道颜色 */
}
</style>
