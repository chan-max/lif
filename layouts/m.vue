<template>
  <div class="mobile-app-layout">
    <!-- 主体内容区域 -->
    <div class="content">
        <button @click="enterFullscreen"> 全屏 </button>
      <slot />
    </div>

    <!-- 底部 Tab 栏 -->
    <div class="tab-bar">
      <div
        class="tab-item"
        :class="{ active: currentTab === 'home' }"
        @click="goTo('home')"
      >
        首页
      </div>
      <div
        class="tab-item"
        :class="{ active: currentTab === 'search' }"
        @click="goTo('search')"
      >
        搜索
      </div>
      <div
        class="tab-item"
        :class="{ active: currentTab === 'profile' }"
        @click="goTo('profile')"
      >
        我的
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 当前选中的 Tab
const currentTab = ref("home");

// 跳转到对应的 Tab 页面
const goTo = (tab: string) => {
  currentTab.value = tab;
  router.push(`/${tab}`);
};

// 在页面加载时请求全屏
const enterFullscreen = () => {
  const docEl = document.documentElement;
  if (docEl.requestFullscreen) {
    docEl.requestFullscreen();
  } else if (docEl.mozRequestFullScreen) {
    // Firefox
    docEl.mozRequestFullScreen();
  } else if (docEl.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    docEl.webkitRequestFullscreen();
  } else if (docEl.msRequestFullscreen) {
    // IE/Edge
    docEl.msRequestFullscreen();
  }
};

// 组件加载完成后进入全屏
onMounted(() => {
  window.onload = function () {
    window.scrollTo(0, 1);
  };

  function stopScroll(e) {
    e.preventDefault();
  }
  document
    .getElementsByTagName("body")[0]
    .addEventListener("touchmove", stopScroll, { passive: false });
});
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 隐藏滚动条 */
  position: fixed;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
/* 移动端布局样式 */
.mobile-app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

/* 内容区 */
.content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}

/* 底部 Tab 栏 */
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 每个 Tab 项目 */
.tab-item {
  font-size: 14px;
  color: #999;
  padding: 10px;
  cursor: pointer;
  transition: color 0.3s;
}

.tab-item.active {
  color: #007bff;
}
</style>
