<template>
  <div class="container mx-auto py-10 px-6">
    <!-- 标题 -->
    <h1 class="text-3xl font-bold mb-6 text-gray-900">Dream List</h1>

    <!-- 数据列表 -->
    <div v-if="list.length > 0" class="space-y-6">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="bg-white shadow-md rounded-lg p-6 border border-gray-200 relative"
      >
        <!-- 查看详情按钮 -->
        <NuxtLink
          :to="`/dreams/${item.id}`"
          class="absolute top-4 right-4 text-indigo-500 hover:text-indigo-700 transition"
        >
          <i class="i-heroicons-eye w-5 h-5 inline-block"></i> View Details
        </NuxtLink>

        <!-- 标题 -->
        <h2 class="text-xl font-semibold text-gray-800">{{ item.title_en }}</h2>

        <!-- 内容（带省略号） -->
        <p v-html="item.message_en" class="mt-4 text-gray-600 line-clamp-3"></p>
      </div>
    </div>

    <!-- 空数据提示 -->
    <div v-else class="text-gray-500 text-center py-10">No data available.</div>

    <!-- 分页组件 -->
    <div class="mt-10 flex flex-wrap justify-between items-center">
      <!-- 每页数量选择 -->
      <div class="flex items-center space-x-2">
        <label for="pageSize" class="text-gray-700">Items per page:</label>
        <select
          id="pageSize"
          v-model.number="pageSize"
          class="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
          @change="onPageSizeChange"
        >
          <option v-for="size in [5, 10, 20]" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <!-- Nuxt 分页组件 -->
      <div class="mt-4 md:mt-0">
        <UPagination
          :prev-button="{
            icon: 'i-heroicons-arrow-small-left-20-solid',
            label: 'Prev',
            color: 'gray',
          }"
          :next-button="{
            icon: 'i-heroicons-arrow-small-right-20-solid',
            trailing: true,
            label: 'Next',
            color: 'gray',
          }"
          v-model="currentPage"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDreamList } from "@/common/api/axios";
import { usePagination } from "@/common/paging";

// 分页逻辑
const {
  list, // 当前列表数据
  getList, // 加载下一页
  loading, // 是否加载中
  total, // 数据总量
  resetPagination, // 重置分页
  currentPage,
  pageSize,
} = usePagination(getDreamList, {
  preprocessParams: (params) => {
    return params;
  },
  defaultCurrentPage: 1,
});

// 页面加载时初始化数据
getList();

// 页码改变
const onPageChange = (page) => {
  currentPage.value = page;
  resetPagination();
  getList();
};

// 每页数量改变
const onPageSizeChange = () => {
  currentPage.value = 1; // 重置到第一页
  resetPagination();
  getList();
};
</script>

<style scoped>
/* TailwindCSS 的省略号样式 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
