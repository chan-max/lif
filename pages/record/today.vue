<template>
  <div class="p-12 flex gap-8 flex-col min-h-screen">
    <h1 class="text-xl font-bold">
      我的今日记录 :{{ dayrecord?.date }} 共添加
      <span class="text-custom-400">{{ dayrecord?.record.length }} </span> 条记录
    </h1>

    <div
      class="flex p-4 border-b border-gray-200 dark:border-gray-700 justify-between items-center gap-4"
    >
      <UInput v-model="q" placeholder="寻找记录" />
      <UButton color="white" variant="solid">清空</UButton>
      <div style="flex: 1"></div>

      <UButton label="添加今日记录" @click="add" />

      <UTooltip text=" 清空今日所有日常记录 ">
        <UButton color="red" variant="ghost" icon="i-heroicons-trash-solid"></UButton>
      </UTooltip>
    </div>
    <UTable :columns="columns" :rows="dayrecord?.record" :loading="loading">
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
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>

      <template #createTime-data="{ row }">
        {{ formatDate(row.createTime) }}
      </template>

      <template #updateTime-data="{ row }">
        {{ formatDate(row.updateTime) }}
      </template>
    </UTable>

    <UModal v-model="showRecordTodayAddForm">
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow',
          },
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              添加记录
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="showRecordTodayAddForm = false"
            />
          </div>
        </template>

        <div class="flex flex-col gap-6">
          <UTextarea
            v-model="json"
            color="primary"
            variant="outline"
            placeholder="请输入json格式，用来存储该字段"
          />

          <UButton block @click="ensureAdd" :loading="submitLoading">
            确认添加该记录
          </UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
<script setup>
import Api from "@/common/api/axios";
import { useDateFormat } from "@vueuse/core";
import { formatDate } from "@/common/date";
import { message } from "ant-design-vue";

useSeoMeta({
  title: "今日记录",
  description: `记录你今天的所有行为`,
});

let dayrecord = ref();

let loading = ref(false);

async function init() {
  loading.value = true;
  let res = await Api.createDayrecord();
  dayrecord.value = res;
  loading.value = false;
}

init();

const columns = [
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
  },
  {
    key: "updateTime",
    label: "记录更新时间",
  },
  {
    label: "操作",
    key: "actions",
  },
];

const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
    },
  ],
];

const showRecordTodayAddForm = ref(false);

// 确认添加记录
function add() {
  showRecordTodayAddForm.value = true;
}

const submitLoading = ref(false);

const json = ref();
// 确认添加记录
async function ensureAdd() {
  let getJSON = new Function(`return ${json.value}`);

  try {
    let j = getJSON();
    submitLoading.value = true;
    await Api.addRecordDetail({ ...j });
    await init();
    showRecordTodayAddForm.value = false;
    message.success("记录添加成功");
  } catch (e) {
    console.error("error input json");
  } finally {
    submitLoading.value = false;
  }
}
</script>
