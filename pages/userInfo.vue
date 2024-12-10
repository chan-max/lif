<template>
  <div class="p-8 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">编辑个人信息</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Username -->
      <div class="mb-6">
        <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
          用户名（不可修改）
        </label>
        <UInput
          id="username"
          v-model="form.username"
          placeholder="Enter your username"
          required
          class="w-full"
          disabled
        />
        <small v-if="errors.username" class="text-red-500">{{ errors.username }}</small>
      </div>

      <!-- Gender -->
      <div class="mb-6">
        <label for="gender" class="block text-sm font-medium text-gray-700 mb-2">
          性别
        </label>
        <USelect
          id="gender"
          v-model="form.gender"
          :options="genderOptions"
          placeholder="Select your gender"
          class="w-full"
        />
        <small v-if="errors.gender" class="text-red-500">{{ errors.gender }}</small>
      </div>

      <!-- Birthday -->
      <div class="mb-6">
        <label for="birthday" class="block text-sm font-medium text-gray-700 mb-2">
          生日
        </label>

        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-heroicons-calendar-days-20-solid"
            :label="
              form.birthday ? format(form.birthday, 'yyyy MMM d hh:mm') : 'Please input'
            "
          />
          <template #panel="{ close }">
            <DatePicker v-model="form.birthday" is-required />
          </template>
        </UPopover>

        <small v-if="errors.birthday" class="text-red-500">{{ errors.birthday }}</small>
      </div>

      <!-- Height -->
      <div class="mb-6">
        <label for="height" class="block text-sm font-medium text-gray-700 mb-2">
          身高 (cm)
        </label>
        <UInput
          id="height"
          v-model="form.height"
          type="number"
          placeholder="Enter your height in cm"
          class="w-full"
        />
        <small v-if="errors.height" class="text-red-500">{{ errors.height }}</small>
      </div>

      <!-- Weight -->
      <div class="mb-6">
        <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">
          体重 (kg)
        </label>
        <UInput
          id="weight"
          v-model="form.weight"
          type="number"
          placeholder="Enter your weight in kg"
          class="w-full"
        />
        <small v-if="errors.weight" class="text-red-500">{{ errors.weight }}</small>
      </div>

      <!-- Save Button -->
      <div class="flex justify-center">
        <UButton
          :loading="loading"
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useLoginStatusStore } from "~/common/store/login";
import { format } from "date-fns";
import Api from "@/common/api/axios";

const router = useRouter();
const loginStore = useLoginStatusStore();

const form = ref({
  username: "",
  birthday: "",
  gender: "",
  height: "", // 身高，单位为厘米
  weight: "", // 体重，单位为千克
});

watch(
  loginStore,
  () => {
    form.value = {
      ...(loginStore.userInfo || {}),
      birthday: loginStore.userInfo?.birthday
        ? new Date(loginStore.userInfo?.birthday)
        : new Date(),
    };
  },
  {
    immediate: true,
  }
);

const errors = ref({
  username: "",
  birthday: "",
  gender: "",
  height: "",
  weight: "",
});

const genderOptions = [
  { label: "男", value: "1" },
  { label: "女", value: "0" },
];

function validateForm() {
  errors.value.username = form.value.username.trim() ? "" : "Username is required.";
  errors.value.birthday = form.value.birthday ? "" : "Birthday is required.";
  errors.value.gender = form.value.gender ? "" : "Gender is required.";
  errors.value.height =
    form.value.height && Number(form.value.height) > 0
      ? ""
      : "Height must be a positive number.";
  errors.value.weight =
    form.value.weight && Number(form.value.weight) > 0
      ? ""
      : "Weight must be a positive number.";

  return (
    !errors.value.username &&
    !errors.value.birthday &&
    !errors.value.gender &&
    !errors.value.height &&
    !errors.value.weight
  );
}

const loading = ref(false);

async function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  try {
    loading.value = true;
    await Api.updateUserInfo(toRaw(form.value));
    message.success("User info updated successfully");
  } catch (e) {
    message.error("Failed to update user info");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Light Mode 样式 */
.light .p-8 {
  background-color: #ffffff;
  color: #000000;
}

.light label {
  color: #333333;
}

.light input,
.light select,
.light .UInput,
.light .USelect,
.light .DatePicker {
  background-color: #f9f9f9;
  color: #000000;
  border: 1px solid #cccccc;
}

.light small {
  color: #ff4d4f; /* 错误提示文字颜色 */
}

.light button.UButton {
  background-color: #007bff;
  color: #ffffff;
}

.light button.UButton:hover {
  background-color: #0056b3;
}

/* Dark Mode 样式 */
.dark .p-8 {
  background-color: #000;
  color: #e2e8f0;
}

.dark label {
  color: #e2e8f0;
}

.dark input,
.dark select,
.dark .UInput,
.dark .USelect,
.dark .DatePicker {
  background-color: #2d3748;
  color: #e2e8f0;
  border: 1px solid #4a5568;
}

.dark small {
  color: #ff6b6b; /* 错误提示文字颜色 */
}

.dark button.UButton {
  background-color: #4a5568;
  color: #e2e8f0;
}

.dark button.UButton:hover {
  background-color: #2c5282;
}
</style>
