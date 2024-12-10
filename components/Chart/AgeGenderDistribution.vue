<script setup>
import Api from "@/common/api/axios";

let dataset = ref([]);

async function init() {
  let data = await Api.getAgeGenderDistribution();

  dataset.value = data
    .filter((item) => item.maleCount || item.femaleCount)
    .map((item) => {
      return [item.year, item.age, item.maleCount, item.femaleCount];
    });
}

const config = ref({
  responsive: true,
  style: {
    backgroundColor: "transparent",
    color: "#CCCCCC",
    fontFamily: "inherit",
    height: 500,
    width: 500,
    layout: {
      padding: { top: 36, right: 12, bottom: 48, left: 12 },
      grid: { show: true, stroke: "#CCCCCC", strokeWidth: 1 },
      dataLabels: {
        sideTitles: {
          show: true,
          fontSize: 18,
          color: "#CCCCCC",
          useSideColor: true,
          bold: false,
          offsetY: 0,
        },
        xAxis: {
          show: true,
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          scale: 1,
          translation: "",
        },
        yAxis: {
          show: true,
          display: "age",
          fontSize: 12,
          color: "#CCCCCC",
          bold: false,
          showEvery: 5,
        },
      },
      centerSlit: { width: 20 },
      bars: {
        gap: 0,
        borderRadius: 1,
        left: { color: "#ff6400" },
        right: { color: "#5f8bee" },
        gradient: { show: true, underlayer: "#FFFFFF", intensity: 60, shiftHue: 0.05 },
      },
    },
    highlighter: { color: "#FFFFFF", opacity: 15 },
    title: {
      text: "用户年龄分布",
      color: "#fafafa",
      fontSize: 20,
      bold: true,
      textAlign: "left",
      paddingLeft: 0,
      paddingRight: 0,
      subtitle: {
        color: "#A1A1A1",
        // text: "我们统计 0 - 100 年龄段的人数",
        fontSize: 16,
        bold: false,
      },
    },
    tooltip: {
      show: true,
      backgroundColor: "#1A1A1A",
      color: "#CCCCCC",
      fontSize: 14,
      customFormat: null,
      borderRadius: 4,
      borderColor: "#3A3A3A",
      borderWidth: 1,
      backgroundOpacity: 50,
      position: "center",
      offsetY: 24,
    },
  },
  translations: {
    age: "年龄",
    male: "男性",
    female: "女性",
    total: "总数",
    year: "年",
  },
  userOptions: {
    show: true,
    position: "right",
    buttons: {
      tooltip: true,
      pdf: true,
      img: true,
      csv: true,
      table: true,
      fullscreen: true,
      annotator: true,
    },
    buttonTitles: {
      open: "Open options",
      close: "Close options",
      tooltip: "Toggle tooltip",
      pdf: "Download PDF",
      csv: "Download CSV",
      img: "Download PNG",
      table: "Toggle table",
      fullscreen: "Toggle fullscreen",
      annotator: "Toggle annotator",
    },
  },
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: { backgroundColor: "#1A1A1A", color: "#CCCCCC", outline: "none" },
    td: { backgroundColor: "#1A1A1A", color: "#CCCCCC", outline: "none" },
  },
});
init();
</script>

<template>
  <VueDataUi component="VueUiAgePyramid" :dataset="dataset" :config="config">
    <!-- <template #svg="{ svg }">
      <circle :cx="svg.width / 2" :cy="svg.height / 2" :r="30" fill="#FF0000" />
    </template> -->

    <!-- <template #legend="{ legend }"> ...your content here </template> -->
    <!-- <template #tooltip-before="{ datapoint, seriesIndex, series, config }">
      ...your content here
    </template>
    <template #tooltip-after="{ datapoint, seriesIndex, series, config }">
      ...your content here
    </template> -->
    <!-- <template #source>
            <div>Source: Lorem ipsum...</div>
        </template> -->
  </VueDataUi>
</template>
