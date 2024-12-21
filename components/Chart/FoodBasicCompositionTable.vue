<template>
  <a-table
    :dataSource="foodCompositions"
    :columns="columns"
    row-key="key"
    :pagination="false"
    :bordered="false"
    :scroll="{
      y: 300,
    }"
  />
</template>

<script setup>
import { foodCompositions } from "~/common/enum/food/food";
import { ref } from "vue";

const columns = ref([
  {
    title: "Key",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "元素",
    dataIndex: "chineseName",
    key: "chineseName",
  },
  {
    title: "英文",
    dataIndex: "name",
    key: "name",
  },
//   {
//     title: "Description",
//     dataIndex: "description",
//     key: "description",
//   },
]);
</script>

<style>
.food-composition-table {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.ant-table {
  background-color: transparent !important;
  border: none;
}

.ant-table th {
  background-color: transparent !important;
  padding: 0;
}
.ant-table td {
  padding: 0;
  background-color: transparent !important;
  font-size: 12px !important;
  line-height: 1.2 !important;
}
</style>
