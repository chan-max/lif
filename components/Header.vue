<template>
  <!-- Header -->
  <header class="text-black py-4 shadow-md z-10">
    <div class="container mx-auto flex justify-between items-center px-4">
      <!-- Logo -->
      <NuxtLink to="/">
        <img
          src="/logo.svg"
          alt="Logo"
          class="h-6 w-auto pr-2 max-w-[240px] md:max-w-none"
        />
      </NuxtLink>

      <!-- Navigation -->
      <div class="flex items-center space-x-12">
        <!-- Tabs for PC -->
        <nav class="hidden md:flex space-x-8">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="navigateTab(index, tab)"
            class="text-custom-400 hover:text-black transition rounded-lg text-sm font-medium text-nowrap"
            :class="[
              'block w-full text-left text-sm',
              $route.path === tab.path ? 'underline text-custom-200' : '',
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>

        <div>
          <template v-if="loginStore.isLogin">
            <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
              <UAvatar
                :src="loginStore.userInfo?.avatar"
                :alt="loginStore.userInfo?.username"
                class="cursor-pointer hover:opacity-80 transition user-avatar w-10 h-10"
                :class="{ 'admin-avatar': isAdmin }"
              />

              <template #item="{ item }">
                <div
                  @click="item.onclick"
                  class="flex w-full items-center"
                  style="column-gap: 6px"
                >
                  <UIcon :name="item.icon" class="w-5 h-5 text-gray-500" />
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </UDropdown>
          </template>
          <template v-else>
            <button
              class="bg-custom-500 hover:bg-custom-600 text-white px-4 py-2 rounded transition"
              @click="showLoginModal = true"
            >
              Login
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <UModal v-model="showLoginModal" title="User Login" :closable="true">
      <div class="p-6 space-y-6">
        <!-- Login Title -->
        <h2 class="text-lg font-bold text-gray-700">Login to Your Account</h2>

        <!-- Username Input -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-600 pb-2">
            Username
          </label>
          <UInput
            id="username"
            v-model="username"
            placeholder="Enter your username"
            :maxLength="15"
            :minLength="5"
            required
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600 pb-2">
            Password
          </label>
          <UInput
            id="password"
            v-model="password"
            placeholder="Enter your password"
            type="password"
            :maxLength="15"
            :minLength="5"
            required
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4">
          <UButton class="text-custom-500" @click="goSignup" variant="link">
            Sign up
          </UButton>

          <div style="flex: 1"></div>

          <UButton
            class="px-6 text-custom-500"
            @click="showLoginModal = false"
            variant="link"
          >
            Cancel
          </UButton>
          <UButton
            class="px-6 bg-custom-500"
            @click="handleLogin"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import Api from "@/common/api/axios";
import {
  doLoginAction,
  useLoginStatusStore,
  initLoginStoreUserInfo,
  doLogout,
} from "@/common/store/login";
import { message } from "ant-design-vue";
import Footer from "@/components/Footer.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";

const router = useRouter();

const loginStore = useLoginStatusStore();

const isAdmin = computed(() => {
  return loginStore.userInfo?.isAdmin;
});

const items = [
  [
    {
      label: "Info",
      icon: "i-heroicons-information-circle",
      onclick: async () => {
        router.push({ path: "/userInfo" });
      },
    },
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
      onclick: async () => {
        doLogout();
      },
    },
  ],
];

const tabs = [
  { label: "Books", path: "/books" },
  { label: "Dreams", path: "/dreams" },
  { label: "Pricing", path: "/pricing" },
];

const showTabsMenu = ref(false);
const showLoginModal = ref(false);

const username = ref("");
const password = ref("");

const navigateTab = (index, tab) => {
  showTabsMenu.value = false;
  router.push({ path: tab.path });
};

const loginLoading = ref(false);

const handleLogin = async () => {
  try {
    loginLoading.value = true;
    const res = await Api.login({ username: username.value, password: password.value });
    doLoginAction(res.data);
    message.success("Login Successful");
    showLoginModal.value = false;
  } catch {
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

<style>
.admin-avatar {
  outline: 1px solid black;
}
</style>
