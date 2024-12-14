<template>
  <UModal v-model="showRecordTodayAddForm" fullscreen>
    <UCard
      fullscreen
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

      <div class="flex flex-col gap-6 p-4">
        <!-- 使用自定义 CustomTabs -->
        <RecordTypeTab v-model="currentRecordType" :items="[...RecordTypeOptions]">
        </RecordTypeTab>

        <template v-if="currentRecordType == 'sleep'">
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="state.password" type="password" />
            </UFormGroup>
          </UForm>
        </template>

        <UButton block @click="ensureAdd" :loading="submitLoading">
          确认添加该记录
        </UButton>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import { showRecordTodayAddForm } from "@/common/store";
import { RecordTypeOptions } from "@/common/enum/record/dayrecord";
import Api from "@/common/api/axios";
import RecordTypeTab from "./RecordTypeTab.vue";

const emits = defineEmits(["add-success"]);

const route = useRoute();
const router = useRouter();

const submitLoading = ref(false);
const json = ref();
const form = ref({});

const schema = ref({});

const state = ref({});

const currentRecordType = ref("sleep");

async function ensureAdd() {
  let getJSON = new Function(`return ${json.value}`);

  try {
    let j = getJSON();
    submitLoading.value = true;
    await Api.addDayrecordDetail({
      ...j,
      type: currentRecordType.value,
      ...form.value,
    });
    emits("add-success");
    showRecordTodayAddForm.value = false;
    message.success("记录添加成功");
  } catch (e) {
    console.error("error input json");
  } finally {
    submitLoading.value = false;
  }
}
</script>
