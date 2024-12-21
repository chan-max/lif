<template>
  <div class="py-12 px-16 flex gap-8 flex-col min-h-screen">
    <h1 class="text-xl font-bold">
      <span class="text-custom-400">{{ total }} </span> 条记录
    </h1>

    <div
      class="flex py-4 border-b border-gray-200 dark:border-gray-700 justify-between items-center gap-4"
    >
      <UInput v-model="searchText" placeholder="寻找记录" />
      <UButton color="white" variant="solid">取消查询</UButton>
      <div style="flex: 1"></div>
      <UButton
        label="刷新"
        variant="ghost"
        icon="i-heroicons-arrow-path"
        @click="reset"
        :loading="loading"
      />
    </div>
    <UTable :columns="columns" :rows="list" :loading="loading" v-model:sort="sortConfig">
      <template #empty-state>
        <div class="flex flex-col items-center justify-center p-12 gap-3">
          <span class="italic text-sm">暂无记录!</span>
        </div>
      </template>
      <template #loading-state>
        <div class="flex items-center justify-center p-12">loading...</div>
      </template>
      <template #actions-data="{ row }">
        <div class="flex justify-center">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </div>
      </template>

      <template #record-count-data="{ row }">
        <div class="h-8 flex justify-center">
          <!-- <Chart-digit :value="row.record.length"></Chart-digit> -->

          {{ row.record?.length }}
        </div>
      </template>
      <template #createTime-data="{ row }">
        {{ formatDate(row.createTime) }}
      </template>

      <template #updateTime-data="{ row }">
        {{ formatDate(row.updateTime) }}
      </template>
    </UTable>

    <div class="flex justify-end">
      <UPagination :page-count="pageSize" v-model="currentPage" :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Api from "@/common/api/axios";
import { useDateFormat } from "@vueuse/core";
import { formatDate } from "@/common/date";
import { message } from "ant-design-vue";
import { useRoute } from "vue-router";
import { getRecordTypeOptionByType } from "@/common/enum/record/dayrecord";
import { usePromise } from "~/common/hooks/promise";
import { Modal } from "ant-design-vue";
import { usePagination } from "@/common/paging";

// 搜素文本
const searchText = ref();

useSeoMeta({
  title: "生活记录",
  description: ``,
});

const route = useRoute();

let sortConfig = ref({ column: null, direction: null });

const {
  loading,
  getList,
  resetPagination,
  list,
  pageSize,
  currentPage,
  total,
} = usePagination(
  (params) => {
    return Api.getDayrecordList({
      ...params,
    });
  },
  {
    pageSize: 5,
  }
);

getList();

function reset() {
  resetPagination();
  getList();
}

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "record-count",
    label: "记录数量",
    sortable: true,
    class: "text-center",
  },
  {
    key: "date",
    label: "日期",
    sortable: true,
  },
  {
    key: "createTime",
    label: "记录时间",
    sortable: true,
  },
  {
    key: "updateTime",
    label: "记录更新时间",
    sortable: true,
  },
  {
    label: "操作",
    key: "actions",
    class: "text-center",
  },
];

const router = useRouter();

const items = (row) => [
  [
    {
      label: "详细记录",
      icon: "i-heroicons-bars-3-16-solid",
      click: async () => {
        router.push({ path: `/record/day/${row.date}` });
      },
    },
    {
      label: "清空记录",
      icon: "i-heroicons-trash-20-solid",
      click: async () => {
        clear(row.id);
      },
    },
  ],
];

async function clear(id) {
  await Modal.confirm({
    title: "清空确认",
    content: "确认清空该记录吗",
    okText: "确认",
    cancelText: "取消",
    onCancel: () => {},
    centered: true,
    onOk: async () => {
      await Api.deleteDayrecordDetail({
        id: null, // 不传id全删
        pid: id,
      });
      await resetPagination();
      await getList();
      message.success("记录已清空");
    },
  });
}
</script>
