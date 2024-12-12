<template>
  <div class="p-12">
    <UTable :rows="list" />
    <div class="mt-8">
      <UPagination :page-count="pageSize" v-model="currentPage" :total="total" />
    </div>
  </div>
</template>

<script setup>
import { usePagination } from "@/common/paging";
import Api from "@/common/api/axios";

// 分页逻辑
const {
  list, // 当前列表数据
  getList, // 加载下一页
  loading, // 是否加载中
  total, // 数据总量
  resetPagination, // 重置分页
  currentPage,
  pageSize,
} = usePagination(Api.getFoods, {
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
