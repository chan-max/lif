<template>
  <div class="p-8 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-center">编辑个人信息</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Avatar Upload -->
      <div class="mb-6 text-center">
        <label class="block text-sm font-medium text-gray-700 mb-2">头像</label>
        <div class="flex flex-col items-center">
          <img
            :src="avatarPreview || form.avatar || getUserDefaultAvatar()"
            style="border: none; outline: none"
            class="w-36 h-36 rounded-full mb-4 object-cover bg-gray-700"
          />
          <input
            type="file"
            @change="handleAvatarSelection"
            accept="image/*"
            class="avatar-input"
          />
          <small v-if="errors.avatar" class="text-red-500">{{ errors.avatar }}</small>
        </div>
      </div>

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
import { uploadToCOS, deleteCOSFile } from "@/common/api/cos"; // 替换为实际路径
import { getUserDefaultAvatar } from "@/common/index";

const router = useRouter();
const loginStore = useLoginStatusStore();

const form = ref({
  username: "",
  avatar: "", // 最终保存的头像地址
  avatarFile: null, // 临时选中的头像文件
  oldAvatar: "", // 保存旧头像地址
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
      oldAvatar: loginStore.userInfo?.avatar || "",
    };
  },
  {
    immediate: true,
  }
);

const errors = ref({
  username: "",
  avatar: "",
  birthday: "",
  gender: "",
  height: "",
  weight: "",
});

const avatarPreview = ref(""); // 头像本地预览地址

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

async function deleteOldAvatar() {
  if (form.value.oldAvatar) {
    try {
      const key = form.value.oldAvatar.split("/").pop(); // 从 URL 中提取文件 key
      await deleteCOSFile(key); // 调用删除接口
      console.log("旧头像已删除:", key);
    } catch (error) {
      console.error("删除旧头像失败:", error);
    }
  }
}

function handleAvatarSelection(event) {
  const file = event.target.files[0];
  if (!file) {
    alert("请选择一个文件！");
    return;
  }

  avatarPreview.value = URL.createObjectURL(file); // 本地预览
  form.value.avatarFile = file; // 暂存新头像文件
}

async function handleSubmit() {
  if (!validateForm()) {
    return;
  }

  try {
    loading.value = true;

    // 如果用户选择了新头像文件，则上传到 COS 并删除旧头像
    if (form.value.avatarFile) {
      // 删除旧头像
      await deleteOldAvatar();

      // 上传新头像
      const { url } = await uploadToCOS({ file: form.value.avatarFile });
      form.value.avatar = url; // 更新为 COS 返回的地址
    }

    // 创建提交数据的副本，移除 avatarFile 和 oldAvatar 字段
    const submitData = { ...toRaw(form.value) };
    delete submitData.avatarFile;
    delete submitData.oldAvatar;

    // 提交用户信息（不包含 avatarFile 和 oldAvatar 字段）
    await Api.updateUserInfo(submitData);
    message.success("User info updated successfully");
  } catch (e) {
    console.error(e);
    message.error("Failed to update user info");
  } finally {
    loading.value = false;
  }
}
</script>

<style>
.avatar-input {
  outline-style: none;
  border: 1px solid #c0c4cc;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  padding: 0;
  padding: 10px 15px;
  box-sizing: border-box;
  font-family: "Microsoft soft";
  &:focus {
    border-color: #f07b00;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), #f07b00;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), #f07b00;
  }
}
</style>
