<template>
  <ClientOnly>
    <v-chart class="w-full h-full" :option="option" autoresize />
    <!-- <div class="text-gray-300 mt-4">
        <p>有效记录: {{ validRecordsCount }}</p>
        <p>空记录: {{ emptyRecordsCount }}</p>
      </div> -->
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Api from "@/common/api/axios"; // 假设 Api 是你的接口请求工具
import { usePromise } from "@/common/hooks/promise";

/**
 * 本组件展示最近 30 天的睡眠时长数据。
 * 数据通过异步接口获取，并使用 ECharts 展示为折线图。
 * - X 轴为日期。
 * - Y 轴为每日睡眠时长（小时）。
 * - 支持平滑曲线展示和空值连接。
 * - 配置了渐变背景和浅色系文字以适应暗色背景。
 * - 提供变量 `filterEmptyRecords` 控制是否过滤无记录的日期。
 */

// 控制是否过滤无记录的日期
const filterEmptyRecords = ref(true);

// 记录统计
const validRecordsCount = ref(0);
const emptyRecordsCount = ref(0);

// 异步接口获取数据
const { data: rawData, loading, error, init } = usePromise(() =>
  Api.getDayrecordLastest(null, 30)
);
init();

// 数据处理函数
const processSleepData = (data: any[], filterEmpty: boolean) => {
  const xAxisData: string[] = []; // 横轴日期
  const seriesData: (number | null)[] = []; // 每个日期的睡眠时长

  let validCount = 0;
  let emptyCount = 0;
  let totalSleepDuration = 0;

  data.forEach((item) => {
    // 筛选并处理 type 为 sleep 的记录
    const dailySleepDuration = item.record
      ?.filter((r: any) => r.type === "sleep")
      ?.reduce((sum, sleep) => {
        const startTime = new Date(sleep.startTime).getTime();
        const endTime = new Date(sleep.endTime).getTime();
        return sum + (endTime - startTime) / (1000 * 60 * 60); // 转换为小时
      }, 0);

    if (!dailySleepDuration || dailySleepDuration <= 0) {
      emptyCount++;
      if (filterEmpty) return;
    } else {
      validCount++;
      totalSleepDuration += dailySleepDuration;
    }

    xAxisData.push(item.date);
    seriesData.push(dailySleepDuration > 0 ? dailySleepDuration : null); // 值为 0 时填充 null
  });

  validRecordsCount.value = validCount;
  emptyRecordsCount.value = emptyCount;

  const averageSleep = validCount > 0 ? totalSleepDuration / validCount : 0;
  const averageData = seriesData.map((value) => (value !== null ? averageSleep : null));

  return { xAxisData, seriesData, averageData, averageSleep };
};

// 图表配置数据
const option = ref(null);

// 监听接口数据变化，动态生成图表配置
watch(
  () => [rawData.value, filterEmptyRecords.value],
  ([newData, filterEmpty]) => {
    if (!newData) return;
    const { xAxisData, seriesData, averageData, averageSleep } = processSleepData(
      newData,
      filterEmpty
    );

    option.value = {
      backgroundColor: "transparent", // 设置背景为透明
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          const { axisValue } = params[0];
          const sleepValue = params[0].data ? params[0].data.toFixed(2) : "无记录";
          const averageValue = params[1].data ? params[1].data.toFixed(2) : "无记录";
          return `日期: ${axisValue}<br />睡眠时长: ${sleepValue} 小时<br />平均值: ${averageValue} 小时`;
        },
        textStyle: { color: "#ccc" }, // 浅色文字
      },
      grid: {
        left: "30px",
        right: "10px",
        top: "30px",
        bottom: "10px",
        containLabel: true, // 确保标签不被裁剪
      },
      xAxis: {
        type: "category",
        data: xAxisData,
        axisLine: { lineStyle: { color: "#ccc" } },
        axisLabel: {
          color: "#ccc", // 坐标轴标签颜色
          fontSize: 12, // 坐标轴标签字体大小
        },
      },
      yAxis: {
        type: "value",
        name: "睡眠时长 (小时)",
        axisLine: { lineStyle: { color: "#ccc" } },
        axisLabel: {
          color: "#ccc", // 坐标轴标签颜色
          fontSize: 12, // 坐标轴标签字体大小
        },
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
      },
      series: [
        {
          name: "睡眠时长",
          type: "line",
          data: seriesData,
          smooth: true,
          connectNulls: true, // 连接空值
          lineStyle: { width: 2 },
          itemStyle: { color: "#00fa00" }, // 曲线颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(0, 250, 0, 0.5)" }, // 上部分颜色
                { offset: 1, color: "rgba(0, 250, 0, 0.1)" }, // 下部分颜色
              ],
            },
          },
        },
        {
          name: "平均睡眠时长",
          type: "line",
          data: averageData,
          smooth: true,
          connectNulls: true, // 连接空值
          lineStyle: { width: 1, color: "rgba(0, 128, 255, 0.6)" }, // 淡蓝色，带透明度
          markLine: {
            symbol: "none",
            data: [
              {
                xAxis: 0, // 在 x 轴第一个位置显示文本
                yAxis: averageSleep,
                label: {
                  show: true,
                  formatter: "平均值",
                  position: "start",
                  color: "rgba(0, 128, 255, 0.5)",
                  fontSize: 12,
                  fontWeight: "bold",
                },
              },
            ],
          },
        },
      ],
    };
  },
  { immediate: true } // 立即执行一次
);
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
