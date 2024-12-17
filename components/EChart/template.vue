<template>
  <div>
    <client-only>
      <v-chart class="chart" :option="option" />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const option = ref({
  title: {
    text: "技术量堆栈柱状图",
    subtext: "nuxt3.0中的EChart堆栈图",
    left: "center",
    textStyle: {
      color: "#DC143C",
    },
    subtextStyle: {
      color: "#008000",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  legend: {
    orient: "horizontal",
    bottom: "bottom",
    textStyle: {
      color: "#FFFDFE",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["前端", "后端", "服务器", "运维", "测试"],
    axisLine: {
      lineStyle: {
        color: "#FFFDFE",
      },
    },
    axisLabel: {
      color: "#FFFDFE",
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      lineStyle: {
        color: "#FFFDFE",
      },
    },
    axisLabel: {
      color: "#FFFDFE",
    },
    splitLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.3)",
      },
    },
  },
  series: [
    {
      name: "初级",
      type: "bar",
      stack: "技术量", // 堆叠组名
      emphasis: {
        focus: "series",
      },
      data: [320, 302, 301, 334, 390],
      itemStyle: {
        color: "#FF4500",
      },
    },
    {
      name: "中级",
      type: "bar",
      stack: "技术量", // 堆叠组名
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 90],
      itemStyle: {
        color: "#1E90FF",
      },
    },
    {
      name: "高级",
      type: "bar",
      stack: "技术量", // 堆叠组名
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290],
      itemStyle: {
        color: "#32CD32",
      },
    },
    {
      name: "专家",
      type: "bar",
      stack: "技术量", // 堆叠组名
      emphasis: {
        focus: "series",
      },
      data: [150, 212, 201, 154, 190],
      itemStyle: {
        color: "#FFD700",
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 500px;
  width: 600px;
}
</style>
