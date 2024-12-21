<template>
  <!-- Header -->
  <header
    :class="`py-4 shadow-md z-10`"
    class="lif-header fixed w-full"
    style="
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      height: var(--header);
      backdrop-filter: blur(6px);
    "
  >
    <div class="mx-auto flex justify-between items-center px-8 h-full">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img
          :src="colorMode == 'dark' ? '/logo6-dark.svg' : '/logo6.svg'"
          alt="Logo"
          class="h-10 w-auto pr-2 max-w-[240px] md:max-w-none hover:scale-105 transition-all"
        />
      </NuxtLink>

      <!-- Navigation -->
      <div class="flex items-center space-x-4">
        <!-- Tabs for PC -->
        <nav class="hidden md:flex space-x-2 mr-4">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="navigateTab(index, tab)"
            :class="[
              'transition rounded-lg text-xs font-medium px-2 py-1',
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
        <!-- <select
          v-model="currentLang"
          @change="changeLanguage"
          class="border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
        >
          <option v-for="option in langOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select> -->

        <!-- User Dropdown or Login -->
        <div>
          <template v-if="loginStore.isLogin">
            <UDropdown :items="[items]" :popper="{ placement: 'bottom-end' }">
              <a-badge :offset="[-4, 4]">
                <!-- <div
                  class="relative bg-gradient-to-r from-custom-400 via-custom-500 to-custom-600 rounded-full"
                > -->
                <UAvatar
                  :src="loginStore.userInfo?.avatar || getUserDefaultAvatar()"
                  :alt="loginStore.userInfo?.username"
                  class="cursor-pointer hover:opacity-80 transition w-10 h-10 rounded-full shrink-0"
                >
                </UAvatar>
                <!-- </div> -->
                <template #count>
                  <img v-if="avatarBadgeSrc" class="w-4 h-4" :src="avatarBadgeSrc" />
                  <div></div>
                </template>
              </a-badge>

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
              class="bg-custom-500 hover:bg-custom-600 text-white px-4 py-2 rounded-full transition text-sm font-medium"
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
          登录你的账号
        </h2>

        <!-- Username Input -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            账号
          </label>
          <UInput
            id="username"
            v-model="username"
            placeholder="输入账号"
            class="mt-1 w-full"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            密码
          </label>
          <UInput
            id="password"
            v-model="password"
            placeholder="输入密码"
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
            注册
          </UButton>
          <UButton
            @click="showLoginModal = false"
            class="text-custom-500 px-4"
            variant="link"
          >
            取消
          </UButton>
          <UButton
            @click="handleLogin"
            class="bg-custom-500 hover:bg-custom-600 text-white px-4 py-2 transition rounded-full"
            :loading="loginLoading"
          >
            登录
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
import { getUserDefaultAvatar } from "@/common/index";

import { colorMode } from "@/common/index";

const currentLang = ref("zh");

const router = useRouter();

const langOptions = ref([
  { label: "English", value: "en" },
  { label: "中文", value: "zh" },
]);

const loginStore = useLoginStatusStore();
const isAdmin = computed(() => loginStore.userInfo?.isAdmin);

const avatarBadgeSrc = computed(() => {
  let gender = loginStore.userInfo?.gender;

  if (gender == "1") {
    return "/img/male.svg";
  }

  if (gender == "0") {
    return "/img/female.svg";
  }
});

const tabs = [
  { label: "健康", path: "/health" },
  { label: "今天", path: "/today" },
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
    label: "编辑信息",
    icon: "i-heroicons-information-circle",
    onclick: () => router.push("/userInfo"),
  },
  {
    label: "个人分析",
    icon: "i-hugeicons-analytics-01",
    onclick: () => router.push("/analyze"),
  },
  { label: "退出", icon: "i-heroicons-arrow-right-on-rectangle", onclick: doLogout },
];

const showTabsMenu = ref(false);

const handleLogin = async () => {
  try {
    loginLoading.value = true;
    const res = await Api.login({ username: username.value, password: password.value });
    doLoginAction(res.data);
    message.success("登录成功");
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
header {
  z-index: 9;
}
.light header {
  background-color: white;
  color: black;
}
.dark header {
  color: white;
  background-color: rgba(18, 18, 18, 0.3);
}
</style>
