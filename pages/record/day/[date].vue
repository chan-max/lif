<template>
  <div class="py-12 px-16 flex gap-8 flex-col min-h-screen">
    <h1 class="text-xl font-bold">
      我的今日记录 :{{ dayrecord?.date }} 共添加
      <span class="text-custom-400">{{ dayrecord?.record.length }} </span> 条记录
    </h1>

    <div
      class="flex py-4 border-b border-gray-200 dark:border-gray-700 justify-between items-center gap-4"
    >
      <UInput v-model="searchText" placeholder="寻找记录" />
      <UButton color="white" variant="solid">取消查询</UButton>

      <UButton
        v-if="selected.length"
        color="red"
        variant="ghost"
        icon="i-heroicons-trash-solid"
        :label="`删除这${selected.length}条`"
        @click="clear(DeleteType.MULTIPLE)"
      ></UButton>

      <div style="flex: 1"></div>

      <UButton
        label="刷新"
        variant="ghost"
        icon="i-heroicons-arrow-path"
        @click="init"
        :loading="loading"
      />
      <UButton label="添加今日记录" variant="solid" @click="add" />

      <UTooltip text=" 清空今日所有日常记录 ">
        <UButton
          color="red"
          variant="ghost"
          label="清空"
          icon="i-heroicons-trash-solid"
          @click="clear(DeleteType.ALL)"
        ></UButton>
      </UTooltip>
    </div>
    <UTable
      v-model="selected"
      :columns="columns"
      :rows="sortedRows"
      :loading="loading"
      v-model:sort="sortConfig"
    >
      <template #empty-state>
        <div class="flex flex-col items-center justify-center p-12 gap-3">
          <span class="italic text-sm">添加今天的第一条记录!</span>
          <UButton label="添加记录" @click="add" />
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

      <template #type-data="{ row }">
        <div class="flex items-center space-x-2">
          <img :src="getRecordTypeOptionByType(row.type)?.logo" class="w-6 h-6" />
          <div>{{ getRecordTypeOptionByType(row.type)?.label }}</div>
        </div>
      </template>
      <template #createTime-data="{ row }">
        {{ formatDate(row.createTime) }}
      </template>

      <template #updateTime-data="{ row }">
        {{ formatDate(row.updateTime) }}
      </template>
    </UTable>

    <AddRecordModal @add-success="init" :date="$route.params.date"></AddRecordModal>
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
import AddRecordModal from "./addRecordModal.vue";
import { showRecordTodayAddForm } from "@/common/store";
import { RecordTypeOptions } from "@/common/enum/record/dayrecord";

// 搜素文本
const searchText = ref();

// 多选选择
const selected = ref([]);

useSeoMeta({
  title: "今日记录",
  description: `记录你今天的所有行为`,
});

const route = useRoute();

let dayrecord = ref();
let sortConfig = ref({ column: null, direction: null });

const { init, loading } = usePromise(async () => {
  let param = route.params.date == "today" ? "" : route.params.date;
  let res = await Api.getDayrecord(param);
  dayrecord.value = res;
});

enum DeleteType {
  SINGLE = "single",
  ALL = "all",
  MULTIPLE = "multiple",
}

init();

const columns = [
  {
    key: "select",
    class: "w-2",
  },
  {
    key: "type",
    label: "记录类型",
  },
  {
    key: "id",
    label: "ID",
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

const sortedRows = computed(() => {
  if (!sortConfig.value.column) {
    return dayrecord.value?.record || [];
  }

  const { column, direction } = sortConfig.value;
  const sorted = [...(dayrecord.value?.record || [])].sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];
    return direction === "asc" ? valueA - valueB : valueB - valueA;
  });

  return sorted;
});

const items = (row) => [
  [
    {
      label: "删除",
      icon: "i-heroicons-trash-20-solid",
      click: async () => {
        clear(DeleteType.SINGLE, row.id);
      },
    },
  ],
];

function add() {
  showRecordTodayAddForm.value = true;
}

async function clear(type: DeleteType, id?: any) {
  let postid: any = null;

  if (type == DeleteType.SINGLE) {
    postid = id;
  }

  if (type == DeleteType.MULTIPLE) {
    postid = selected.value.map((item) => item.id);
  }

  if (type == DeleteType.ALL) {
    postid = null;
  }

  await Modal.confirm({
    title: "删除确认",
    content: "确认删除记录吗",
    okText: "确认",
    cancelText: "取消",
    onCancel: null,
    centered: true,
    onOk: async () => {
      await Api.deleteDayrecordDetail({
        id: postid, // 不传id全删
        pid: dayrecord.value.id,
      });
      await init();
      selected.value = [];
      message.success("记录删除成功");
    },
  });
}
</script>
