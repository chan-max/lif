<template>
  <!-- Header -->
  <header
    :class="`py-4 shadow-md z-10`"
    style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); height: var(--header)"
  >
    <div class="mx-auto flex justify-between items-center px-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img
          :src="colorMode == 'dark' ? '/logo-dark.svg' : '/logo.svg'"
          alt="Logo"
          class="h-10 w-auto pr-2 max-w-[240px] md:max-w-none"
        />
      </NuxtLink>

      <!-- Navigation -->
      <div class="flex items-center space-x-4">
        <!-- Tabs for PC -->
        <nav class="hidden md:flex space-x-2 mr-8">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="navigateTab(index, tab)"
            :class="[
              'transition rounded-lg text-sm font-medium px-3 py-2',
              $route.path === tab.path
                ? 'bg-custom-200 text-black dark:bg-custom-600 dark:text-white'
                : 'text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white',
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>

        <ColorMode />

        <!-- Language Selector -->
        <select
          v-model="currentLang"
          @change="changeLanguage"
          class="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <option v-for="option in langOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <!-- User Dropdown or Login -->
        <div>
          <template v-if="loginStore.isLogin">
            <UDropdown :items="[items]" :popper="{ placement: 'bottom-end' }">
              <UAvatar
                :src="loginStore.userInfo?.avatar"
                :alt="loginStore.userInfo?.username"
                class="cursor-pointer hover:opacity-80 transition w-10 h-10 rounded-full"
                :class="{ 'border-2 border-custom-500': isAdmin }"
              />
              <template #item="{ item }">
                <div
                  @click="item.onclick"
                  class="flex items-center px-4 py-2 transition cursor-pointer"
                >
                  <UIcon
                    :name="item.icon"
                    class="w-5 h-5 text-gray-500 dark:text-gray-300"
                  />
                  <span class="ml-2">{{ item.label }}</span>
                </div>
              </template>
            </UDropdown>
          </template>
          <template v-else>
            <button
              class="bg-custom-500 hover:bg-custom-600 text-white px-4 py-2 rounded transition text-sm font-medium"
              @click="showLoginModal = true"
            >
              {{ $t("common.login") }}
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <UModal v-model="showLoginModal" title="User Login" :closable="true">
      <div class="p-6 space-y-4">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Login to Your Account
        </h2>

        <!-- Username Input -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Username
          </label>
          <UInput
            id="username"
            v-model="username"
            placeholder="Enter your username"
            class="mt-1 w-full"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            Password
          </label>
          <UInput
            id="password"
            v-model="password"
            placeholder="Enter your password"
            type="password"
            class="mt-1 w-full"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 mt-4">
          <UButton
            @click="goSignup"
            class="text-custom-500 dark:text-custom-300"
            variant="link"
          >
            Sign up
          </UButton>
          <UButton
            @click="showLoginModal = false"
            class="text-custom-500 px-4"
            variant="link"
          >
            Cancel
          </UButton>
          <UButton
            @click="handleLogin"
            class="bg-custom-500 hover:bg-custom-600 text-white px-4 py-2 rounded transition"
            :loading="loginLoading"
          >
            Login
          </UButton>
        </div>
      </div>
    </UModal>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useLoginStatusStore, doLogout } from "@/common/store/login";
import Api from "@/common/api/axios";
import { doLoginAction } from "@/common/store/login";

import { colorMode } from "@/common/index";

const currentLang = ref("zh");

const router = useRouter();

const langOptions = ref([
  { label: "English", value: "en" },
  { label: "中文", value: "zh" },
]);

const loginStore = useLoginStatusStore();
const isAdmin = computed(() => loginStore.userInfo?.isAdmin);

const tabs = [
  { label: "健康", path: "/health" },
  { label: "记录", path: "/record" },
  { label: "睡眠", path: "/sleep" },
  { label: "饮食", path: "/diet" },
];

const showLoginModal = ref(false);
const username = ref("");
const password = ref("");
const loginLoading = ref(false);

const navigateTab = (index, tab) => {
  router.push(tab.path);
};

const items = [
  {
    label: "个人信息",
    icon: "i-heroicons-information-circle",
    onclick: () => router.push("/userInfo"),
  },
  { label: "退出", icon: "i-heroicons-arrow-right-on-rectangle", onclick: doLogout },
];

const showTabsMenu = ref(false);

const handleLogin = async () => {
  try {
    loginLoading.value = true;
    const res = await Api.login({ username: username.value, password: password.value });
    doLoginAction(res.data);
    message.success("Login Successful");
    showLoginModal.value = false;
  } catch (e) {
    console.log(e);
    loginLoading.value = false;
  } finally {
    loginLoading.value = false;
  }
};

function goSignup() {
  showLoginModal.value = false;
  router.push({ path: "/signup" });
}
</script>

<style scoped>
header.light {
  background-color: white;
  color: black;
}
header.dark {
  background-color: #000;
  color: white;
}
</style>
