<script setup>
import { ref } from "vue";
import { VueUiWordCloud } from "vue-data-ui";
import "vue-data-ui/style.css"; // If you are using multiple components, place styles import in your main

const config = ref({
  responsive: true,
  theme: "dark",
  customPalette: [],
  useCssAnimation: true,
  animationDelayMs: 20,
  userOptions: {
    show: false,
    showOnChartHover: false,
    keepStateOnChartLeave: true,
    position: "right",
    buttons: {
      tooltip: true,
      pdf: true,
      csv: true,
      img: true,
      table: true,
      labels: false,
      fullscreen: true,
      sort: false,
      stack: false,
      animation: false,
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
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "#ffffff00",
      color: "#1A1A1Aff",
      height: 300,
      width: 600,
      zoom: {
        show: false,
        color: "#CCCCCCff",
        highlightColor: "rgba(74, 74, 74, 1)",
        useResetSlot: false,
      },
      words: {
        maxFontSize: 100,
        minFontSize: 10,
        bold: false,
        proximity: 10,
        packingWeight: 1,
        color: "#1A1A1Aff",
        usePalette: true,
      },
      tooltip: {
        show: false,
        color: "#1A1A1Aff",
        backgroundColor: "#FFFFFFff",
        fontSize: 14,
        customFormat: null,
        borderRadius: 4,
        borderColor: "#e1e5e8",
        borderWidth: 1,
        backgroundOpacity: 100,
        position: "center",
        offsetY: 24,
        roundingValue: 0,
      },
    },
  },
});

const dataset = ref([
  {
    name: "生活记录",
    value: 4,
  },
  {
    name: "健康分析",
    value: 4,
  },
  {
    name: "运气分析",
    value: 3,
  },
  {
    name: "饮食习惯",
    value: 3,
  },
  {
    name: "回忆",
    value: 3,
  },
  {
    name: "幸运日预测",
    value: 3,
  },
  {
    name: "每日饮食参数",
    value: 3,
  },
  {
    name: "营养摄入表",
    value: 3,
  },
  {
    name: "non",
    value: 2,
  },
  {
    name: "mauris",
    value: 2,
  },
  {
    name: "volutpat",
    value: 2,
  },
  {
    name: "nulla",
    value: 2,
  },
  {
    name: "purus",
    value: 2,
  },
  {
    name: "leo",
    value: 2,
  },
  {
    name: "urna",
    value: 2,
  },
  {
    name: "dictum",
    value: 2,
  },
]);
</script>
<template>
  <!-- Using a wrapper is optional -->
  <VueUiWordCloud :config="config" :dataset="dataset" />
</template>
