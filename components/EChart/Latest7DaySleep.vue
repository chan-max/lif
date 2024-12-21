<template>
  <ClientOnly>
    <v-chart class="chart" :option="option" autoresize />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Api from "@/common/api/axios"; // 假设Api是你的接口请求工具
import { usePromise } from "@/common/hooks/promise";
import { sleepCategories } from "~/common/enum/record/sleep";
// 异步接口获取数据
const { data: rawData, loading, error, init } = usePromise(Api.getDayrecordLastest);

init();

// 定义睡眠分类

// 数据处理函数
const processSleepData = (data: any[]) => {
  const xAxisData: string[] = []; // 横轴日期
  const seriesData: number[][] = []; // 每个日期的睡眠数据

  data.forEach((item) => {
    xAxisData.push(item.date);

    if (!item.record) {
      return seriesData.push([]);
    }

    const sleepDurations = item.record
      ?.filter((r: any) => r.type === "sleep")
      ?.map((sleep) => {
        const startTime = new Date(sleep.startTime).getTime();
        const endTime = new Date(sleep.endTime).getTime();
        return (endTime - startTime) / (1000 * 60 * 60); // 转换为小时
      });

    seriesData.push(sleepDurations);
  });

  return { xAxisData, seriesData };
};

// 图表配置数据
// 图表配置数据
const option = ref(null);

// 监听接口数据变化，动态生成图表配置
watch(
  () => rawData.value,
  (newData) => {
    if (!newData) return;
    const { xAxisData, seriesData } = processSleepData(newData);

    const series = [];
    const categoryMap = new Map(); // 存储每个分类对应的系列

    // 按照类别给每个睡眠时长赋予颜色
    for (let i = 0; i < seriesData.length; i++) {
      const sleepDurations = seriesData[i];
      sleepDurations.forEach((duration, j) => {
        const category = getCategoryByDuration(duration);

        if (!categoryMap.has(category.key)) {
          categoryMap.set(category.key, {
            name: category.category,
            type: "bar",
            stack: "sleep",
            data: Array(seriesData.length).fill(0),
            itemStyle: {
              color: category.color,
            },
            emphasis: { focus: "series" },
          });
        }

        const categorySeries = categoryMap.get(category.key);
        categorySeries.data[i] = duration.toFixed(2);
      });
    }

    // 将所有分类的 series 转换成数组
    categoryMap.forEach((categorySeries) => {
      series.push(categorySeries);
    });

    // 更新图表配置
    option.value = {
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        show: false,
        bottom: "10px", // 将 legend 放在距底部 10px 位置
        textStyle: { color: "#FFFDFE" },
        padding: [0, 0], // legend 内边距调整
        data: Array.from(categoryMap.values()).map((item) => item.name), // 使用分类名作为 legend
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "0%", // 增加 grid.bottom，确保 xAxis 不被遮挡
        top: "15%", // 保证标题和图表之间的空间
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLine: { lineStyle: { color: "#FFFDFE" } },
        axisLabel: {
          color: "#FFFDFE",
        },
      },
      yAxis: {
        type: "value",
        name: "时长 (小时)",
        axisLine: { lineStyle: { color: "#FFFDFE" } },
        axisLabel: { color: "#FFFDFE" },
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
      },
      series: series,
    };
  },
  { immediate: true } // 立即执行一次
);

// 根据睡眠时长获取分类
const getCategoryByDuration = (duration: number) => {
  return (
    sleepCategories.find(
      (category) =>
        duration * 60 * 60 * 1000 >= category.minMilliseconds &&
        duration * 60 * 60 * 1000 <= category.maxMilliseconds
    ) || sleepCategories[0]
  );
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
