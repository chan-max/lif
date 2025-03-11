<template>
  <div class="flex flex-col items-center">
    <div class="banner-container container m-auto p-12">
      <!-- <canvas id="star-canvas"></canvas> -->
      <!-- 左侧图片 -->
      <div class="banner-image">
        <Chart-BannerWordCloud></Chart-BannerWordCloud>
      </div>

      <!-- 右侧文字 -->
      <div class="banner-content">
        <h1 class="text-[2.5em] md:text-[4em] font-bold gradient-text gradient-text-color">
          AI 驱动的人生健康助手
        </h1>
        <p class="text-sm md:text-base">您的所有记录将会参与数据分析，便于获取更精准的身体状况的与个性化提示</p>
        <UButton :ui="{ rounded: 'rounded-full' }" size="lg" variant="solid" class="mt-4"
          ><span> 快速开始 </span></UButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "bg",
});
</script>

<style scoped lang="less">
/* 核心样式设计 */

/* 容器样式 */
.banner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh) !important; /* 高度占满屏幕 */
  background-color: transparent; /* 背景透明 */
  gap: 64px; /* 图片和文字的间距 */
  flex-wrap: wrap; /* 保证在小屏幕下内容自动换行 */
  width: 100%;
}

/* 左侧图片样式 */
.banner-image {
  flex: 2; /* 左侧图片占较大比例 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* 图片宽度自适应 */
  max-width: 800px; /* 最大宽度限制 */
  min-height: 50vh;
  height: auto; /* 高度自适应 */
}

.banner-image img {

  object-fit: contain; /* 确保图片内容完整 */
  border-radius: 8px; /* 图片的圆角 */
}

/* 右侧文字样式 */
.banner-content {
  flex: 2; /* 右侧文字占与图片相同的比例 */
  text-align: right; /* 文字居右对齐 */
  padding: 10px; /* 添加内边距增加舒适感 */
}

.banner-subtitle {
  line-height: 1.8;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .banner-container {
    gap: 15px; /* 减少间距 */
  }

  .banner-image img {
    max-width: 500px; /* 调整图片最大宽度 */
  }

  .banner-content {
    text-align: center; /* 中屏幕文字居中对齐 */
  }

  .banner-title {
    font-size: 2rem;
  }

  .banner-subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .banner-container {
    flex-direction: column; /* 垂直排列 */
    text-align: center; /* 居中内容 */
    height: auto; /* 小屏幕高度自动适应内容 */
    padding: 20px; /* 增加内边距 */
  }

  .banner-image {
    flex: unset; /* 取消图片比例限制 */
  }

  .banner-image img {
    max-width: 100%; /* 保证图片在小屏幕上撑满容器 */
  }

  .banner-content {
    text-align: center; /* 文字居中 */
    padding: 0; /* 移除内边距 */
  }

  .banner-title {
    font-size: 1.8rem;
  }

  .banner-subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .banner-image img {
    max-width: 350px; /* 超小屏幕下限制图片宽度 */
  }

  .banner-title {
    font-size: 1.6rem;
  }

  .banner-subtitle {
    font-size: 0.9rem;
  }

  .banner-content h1 {
    font-size: 2em; /* 进一步减小标题字体大小 */
  }

  .banner-content p {
    font-size: 0.9em; /* 进一步减小段落字体大小 */
  }

  .banner-content .UButton {
    font-size: 0.9em; /* 减小按钮字体大小 */
    padding: 8px 16px; /* 调整按钮内边距 */
  }
}

.light {
  .gradient-text-color {
    background: linear-gradient(90deg, #00fa00 0%, #ffaacc 40%, #000000 100%);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.dark {
  .gradient-text-color {
    background: linear-gradient(90deg, #00fa00 0%, #ffaacc 40%, #ffffff 100%);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.slow-heartbeat {
  --animate-duration: 2s; /* 自定义动画持续时间 */
}

.user-avatar img {
  height: 100%;
}

#star-canvas {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.dark {
  #star-canvas {
    display: block;
  }
}
</style>