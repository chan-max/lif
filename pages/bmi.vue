<template>
  <div class="p-8 max-w-lg mx-auto">
    <h1 class="text-2xl font-bold text-center mb-6">您的 BMI 指数</h1>

    <div class="mb-8 bg-gray-100 p-6 rounded-lg shadow dark:bg-gray-800">
      <h2 class="text-lg font-semibold mb-2">BMI 计算结果</h2>
      <p class="text-lg mb-4">
        根据您的身高（<strong>{{ loginStore.userInfo?.height }} cm</strong>）和体重
        （<strong>{{ loginStore.userInfo?.weight }} kg</strong>），您的 BMI 指数为：
        <span class="text-blue-500 font-semibold">{{ bmi }}</span>
      </p>
      <p class="text-lg font-medium">
        您的 BMI 分类：
        <span :class="bmiCategoryClass">{{ bmiCategory }}</span>
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-lg font-semibold">什么是 BMI？</h2>
      <p class="text-sm text-gray-700 dark:text-gray-300">
        BMI（身体质量指数）是根据身高和体重计算的身体脂肪测量值。它用于判断您的体重是否健康，以及是否存在体重过轻、超重或肥胖的风险。
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-lg font-semibold">健康范围及提示</h2>
      <ul class="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
        <li>BMI 在 18.5 和 24.9 之间被认为是健康范围。</li>
        <li>规律运动和均衡饮食有助于保持健康的 BMI。</li>
        <li>如果对您的 BMI 有疑虑，请咨询专业医生或营养师。</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useLoginStatusStore } from "~/common/store/login";

const loginStore = useLoginStatusStore();

// 计算 BMI 指数
const bmi = computed(() => {
  const { height, weight } = loginStore.userInfo || {};
  if (!height || !weight) return "无法计算";
  const heightInMeters = height / 100;
  return (weight / heightInMeters ** 2).toFixed(2);
});

// BMI 分类及样式
const bmiCategory = computed(() => {
  const value = parseFloat(bmi.value);
  if (isNaN(value)) return "未知";

  if (value < 18.5) return "体重过轻";
  if (value >= 18.5 && value < 24.9) return "正常";
  if (value >= 25 && value < 29.9) return "超重";
  return "肥胖";
});

const bmiCategoryClass = computed(() => {
  switch (bmiCategory.value) {
    case "体重过轻":
      return "text-yellow-500";
    case "正常":
      return "text-green-500";
    case "超重":
      return "text-orange-500";
    case "肥胖":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
});
</script>

<style scoped>
/* 可选：为页面添加自定义样式 */
</style>
