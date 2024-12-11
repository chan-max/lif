<script setup>
import Api from "@/common/api/axios";

const rawData = ref({});

async function init() {
  let data = await Api.getHeightDistribution();
  let {
    list,
    overallHeight: { allAverageHeight, allMaleAverageHeight, allFemaleAverageHeight },
  } = data;

  // 过滤掉平均身高为空的数据
  list = list.filter((item) => item.overallAverageHeight);

  config.value.chart.grid.labels.xAxisLabels.values = list.map((item) => item.age);

  dataset.value[0].series = list.map((item) => item.overallAverageHeight);
}

const dataset = ref([
  {
    name: "平均身高",
    type: "line",
    smooth: "true",
    series: [],
  },
]);

const config = ref({
  responsive: true,
  table: {
    th: { backgroundColor: "#2A2A2A", color: "#CCCCCC" },
    td: { backgroundColor: "#2A2A2A", color: "#CCCCCC" },
  },
  chart: {
    backgroundColor: "transparent",
    color: "#CCCCCC",
    padding: {
      left: 64,
    },
    title: {
      text: "身高曲线分布",
      color: "#CCCCCC",
      textAlign: "left",
      paddingLeft: 24,
      subtitle: { text: "Subtitle" },
    },
    legend: { color: "#CCCCCC" },
    tooltip: {
      backgroundColor: "#2A2A2A",
      color: "#CCCCCC",
      showPercentage: false,
      borderColor: "#5A5A5A",
      backgroundOpacity: 30,
    },
    highlighter: { color: "#FFFFFF", opacity: 5 },
    highlightArea: {
      show: true,
      from: 0,
      to: 20,
      color: "#FFFFFF",
      opacity: 3,
      caption: { text: "" },
    },
    grid: {
      stroke: "#5A5A5A",
      frame: { show: true, stroke: "#5A5A5A" },
      labels: {
        fontSize: 12,
        color: "#CCCCCC",
        axis: {
          yLabel: "身高",
          fontSize: 12,
          xLabel: "年龄",
          xLabelOffsetY: 48,
          yLabelOffsetX: 0,
        },
        xAxis: { showBaseline: true },
        xAxisLabels: {
          color: "#CCCCCC",
          values: [],
          rotation: 0,
        },
        yAxis: {},
      },
    },
    labels: { fontSize: 12 },
    zoom: {
      minimap: {
        show: false,
        lineColor: "#1F77B4",
        indicatorColor: "#CCCCCC",
        smooth: true,
      },
    },
  },
  line: {
    radius: 2,
    useGradient: false,
    labels: { show: false, color: "#CCCCCC", offsetY: -20 },
    strokeWidth: 2,
    dot: { useSerieColor: false, fill: "#FFFFFF", strokeWidth: 2 },
  },
  bar: { labels: { show: true, color: "#CCCCCC", offsetY: -6 } },
});

init();
</script>

<template>
  <ClientOnly>
    <VueDataUi component="VueUiXy" :dataset="dataset" :config="config"> </VueDataUi>
  </ClientOnly>
</template>
