<template>
  <div class="banner-container container m-auto p-12">
    <canvas id="star-canvas"></canvas>
    <!-- 左侧图片 -->
    <div class="banner-image">
      <img
        src="/bg.svg"
        alt="Background Image"
        class="animate__animated animate__pulse animate__infinite slow-heartbeat"
      />
    </div>

    <!-- 右侧文字 -->
    <div class="banner-content">
      <h1 class="text-[4em] font-bold gradient-text gradient-text-color">
        你的人生健康助手
      </h1>
      <UButton :ui="{ rounded: 'rounded-full' }" size="xl" variant="solid" class="mt-4"
        ><span> 快速开始 </span></UButton
      >
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  const canvas = document.getElementById("star-canvas");

  const ctx = canvas.getContext("2d");

  let stars = [];
  const layerCount = 3; // 3 layers for parallax
  const speeds = [0.05, 0.1, 0.2]; // Slower speeds for distant stars
  const baseStarCount = 50; // Base count of stars per layer
  let shootingStar = null;

  // Generate a random gray color for stars
  function getRandomGrayColor() {
    const grayValue = Math.floor(Math.random() * 256);
    return `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
  }

  // Resize the canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars(); // Recreate stars based on new dimensions
  }

  // Create the starfield
  function createStars() {
    stars = [];
    const scalingFactor = Math.max(canvas.width, canvas.height) / 1000; // Scale star count
    for (let i = 0; i < layerCount; i++) {
      const starCount = Math.floor(baseStarCount * scalingFactor * (i + 1));
      for (let j = 0; j < starCount; j++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (i + 1), // Larger stars for closer layers
          speed: speeds[i],
          opacity: Math.random(),
          baseOpacity: Math.random() * 0.5 + 0.5, // Base opacity for twinkling
          layer: i, // Track which layer the star belongs to
        });
      }
    }
  }

  // Update star positions and simulate twinkling
  function updateStars() {
    stars.forEach((star) => {
      star.y -= star.speed; // All stars move upward
      star.opacity = star.baseOpacity + Math.sin(Date.now() * 0.001 * star.speed) * 0.3; // Smooth twinkle

      // Reset star position when it goes off-screen
      if (star.y < 0) {
        star.y = canvas.height;
        star.x = Math.random() * canvas.width;
      }
    });
  }

  // Draw the stars
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Add a dark radial blur gradient background
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 8, // Start small for a blur effect
      canvas.width / 2,
      canvas.height / 2,
      canvas.width // Expand to the edges
    );
    // gradient.addColorStop(0, "rgba(10, 20, 40, 1)"); // Deep dark blue at the center
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)"); // Black at the edges

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars with parallax effect
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });
  }

  // Initialize a shooting star
  function createShootingStar() {
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height;
    const angle = Math.random() * Math.PI * 2; // Random direction
    const length = Math.random() * 300 + 100; // Random trail length
    const speed = Math.random() * 4 + 2;

    shootingStar = {
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      opacity: 1,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
    };

    // Schedule the next shooting star (20–40 seconds for rare appearance)
    const nextAppearance = Math.random() * 20000 + 20000;
    setTimeout(createShootingStar, nextAppearance);
  }

  // Update shooting star position
  function updateShootingStar() {
    if (!shootingStar) return;

    shootingStar.x += shootingStar.dx;
    shootingStar.y += shootingStar.dy;
    shootingStar.opacity -= 0.01;

    if (
      shootingStar.opacity <= 0 ||
      shootingStar.x < 0 ||
      shootingStar.x > canvas.width ||
      shootingStar.y < 0 ||
      shootingStar.y > canvas.height
    ) {
      shootingStar = null; // Remove shooting star
    }
  }

  // Draw the shooting star
  function drawShootingStar() {
    if (!shootingStar) return;

    const gradient = ctx.createLinearGradient(
      shootingStar.x,
      shootingStar.y,
      shootingStar.x - shootingStar.dx * shootingStar.length,
      shootingStar.y - shootingStar.dy * shootingStar.length
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(
      shootingStar.x - shootingStar.dx * shootingStar.length,
      shootingStar.y - shootingStar.dy * shootingStar.length
    );
    ctx.stroke();
    ctx.closePath();
  }

  // Animation loop
  function animate() {
    updateStars();
    updateShootingStar();
    drawStars();
    drawShootingStar();
    requestAnimationFrame(animate);
  }

  // Handle resizing
  window.addEventListener("resize", resizeCanvas);

  // Initialize
  resizeCanvas();
  createStars();
  setTimeout(createShootingStar, Math.random() * 20000 + 20000); // Rare shooting stars
  animate();
});
</script>

<style scoped lang="less">
/* 核心样式设计 */

/* 容器样式 */
.banner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - var(--header)) !important; /* 高度占满屏幕 */
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
}

.banner-image img {
  width: 100%; /* 图片宽度自适应 */
  max-width: 800px; /* 最大宽度限制 */
  height: auto; /* 高度自适应 */
  object-fit: contain; /* 确保图片内容完整 */
  border-radius: 8px; /* 图片的圆角 */
}

/* 右侧文字样式 */
.banner-content {
  flex: 2; /* 右侧文字占与图片相同的比例 */
  text-align: right; /* 文字居右对齐 */
  color: #333;
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
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
