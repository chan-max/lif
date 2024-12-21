<template>
  <div>
    <VueDataUi component="VueUiOnion" :config="config" :dataset="dataset"></VueDataUi>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 总时长：24 小时（毫秒）
const totalMilliseconds = 24 * 60 * 60 * 1000;

// 睡眠分类数据
const sleepCategories = [
  {
    key: "extremely_short_sleep",
    category: "极短睡眠",
    minMilliseconds: 0,
    maxMilliseconds: 4 * 60 * 60 * 1000,
    color: "#FF4D4D",
  },
  {
    key: "short_sleep",
    category: "短睡眠",
    minMilliseconds: 4 * 60 * 60 * 1000,
    maxMilliseconds: 6 * 60 * 60 * 1000,
    color: "#FF9900",
  },
  {
    key: "short_nap",
    category: "短时小睡",
    minMilliseconds: 10 * 60 * 1000,
    maxMilliseconds: 60 * 60 * 1000,
    color: "#FFD700",
  },
  {
    key: "nap",
    category: "午睡",
    minMilliseconds: 30 * 60 * 1000,
    maxMilliseconds: 2 * 60 * 60 * 1000,
    color: "#85E085",
  },
  {
    key: "normal_sleep",
    category: "正常睡眠",
    minMilliseconds: 7 * 60 * 60 * 1000,
    maxMilliseconds: 9 * 60 * 60 * 1000,
    color: "#00CCFF",
  },
  {
    key: "long_sleep",
    category: "长睡眠",
    minMilliseconds: 9 * 60 * 60 * 1000,
    maxMilliseconds: 12 * 60 * 60 * 1000,
    color: "#B266FF",
  },
  {
    key: "restorative_sleep",
    category: "恢复性睡眠",
    minMilliseconds: 12 * 60 * 60 * 1000,
    maxMilliseconds: Infinity,
    color: "#3366FF",
  },
];

// 数据处理：将睡眠分类转换为 VueUiOnion 所需的格式
const dataset = ref(
  sleepCategories.map((item) => {
    const duration =
      Math.min(item.maxMilliseconds, totalMilliseconds) - item.minMilliseconds;
    const percentage = Number(((duration / totalMilliseconds) * 100).toFixed(2));

    return {
      name: item.category,
      value: Number((duration / (60 * 60 * 1000)).toFixed(2)), // 时长（小时）
      percentage: percentage, // 占比百分比
    };
  })
);

// VueDataUi 样式配置
const config = ref({
  responsive: true,
  useBlurOnHover: true,
  useCssAnimation: true,
  useStartAnimation: true,
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "transparent",
      color: "#CCCCCC",
      useGradient: false,
      gradientIntensity: 20,
      layout: {
        gutter: { color: "#3A3A3A", width: 0.85 },
        labels: { color: "#CCCCCC" },
        track: { width: 0.85 },
      },
      legend: {
        show: true,
        bold: true,
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 12,
        roundingValue: 0,
        roundingPercentage: 0,
      },
      tooltip: {
        show: true,
        backgroundColor: "#1A1A1A",
        color: "#CCCCCC",
        fontSize: 14,
        roundingValue: 2,
        roundingPercentage: 2,
        customFormat: null,
        borderRadius: 4,
        borderColor: "#3A3A3A",
        borderWidth: 1,
        showValue: true,
        showPercentage: true,
        backgroundOpacity: 30,
        position: "center",
        offsetY: 24,
      },
    },
  },
  userOptions: {
    show: false,
  },
});
</script>
