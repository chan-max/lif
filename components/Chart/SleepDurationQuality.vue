<script setup>
import { ref } from "vue";
import { VueDataUi } from "vue-data-ui";
import "vue-data-ui/style.css";
import { sleepCategories } from "@/common/enum/record/sleep";

// 数据转换函数
const sleepCategoriesToDataset = (data) => {
  return data.map((item) => {
    const minHours = item.minMilliseconds / (60 * 60 * 1000); // 转换为小时
    const maxHours = item.maxMilliseconds / (60 * 60 * 1000); // 转换为小时
    const average = (item.minMilliseconds + item.maxMilliseconds) / 2 / (60 * 60 * 1000); // 平均小时数
    return [
      item.key, // period
      minHours, // open
      maxHours, // high
      minHours / 2, // low (假设为 minHours 的一半)
      average, // last (平均值)
      0, // volume (模拟体量为类名长度 * 10)
    ];
  });
};

// 转换后的数据
const dataset = sleepCategoriesToDataset(sleepCategories);

const config = ref({
  responsive: false,
  theme: "",
  useCssAnimation: true,
  style: {
    fontFamily: "inherit",
    backgroundColor: "#FFFFFF",
    color: "#2D353C",
    height: 316,
    width: 512,
    layout: {
      padding: { top: 36, right: 48, bottom: 36, left: 48 },
      selector: { color: "#e1e5e8", opacity: 10 },
      grid: {
        show: true,
        stroke: "#e1e5e8",
        strokeWidth: 0.5,
        xAxis: {
          dataLabels: {
            show: true,
            fontSize: 10,
            color: "#2D353C",
            offsetY: 0,
            bold: false,
            rotation: 0,
          },
        },
        yAxis: {
          dataLabels: {
            show: true,
            fontSize: 12,
            color: "#2D353C",
            roundingValue: 0,
            offsetX: 0,
            bold: false,
            steps: 10,
            prefix: "",
            suffix: "",
          },
        },
      },
      wick: {
        stroke: "#2D353C",
        strokeWidth: 0.5,
        extremity: { shape: "line", size: "auto", color: "#2D353C" },
      },
      candle: {
        borderRadius: 1,
        stroke: "#2D353C",
        strokeWidth: 0.5,
        colors: { bearish: "#dc3912", bullish: "#2ca02c" },
        gradient: { show: true, underlayer: "#FFFFFF" },
        widthRatio: 0.5,
      },
    },
    zoom: {
      show: true,
      color: "#CCCCCC",
      highlightColor: "#4A4A4A",
      fontSize: 14,
      useResetSlot: false,
    },
    title: {
      text: "",
      color: "#2D353C",
      fontSize: 20,
      bold: true,
      textAlign: "center",
      paddingLeft: 0,
      paddingRight: 0,
      subtitle: { color: "#A1A1A1", text: "", fontSize: 16, bold: false },
    },
    tooltip: {
      show: true,
      color: "#2D353C",
      backgroundColor: "#FFFFFF",
      fontSize: 14,
      customFormat: null,
      borderRadius: 4,
      borderColor: "#e1e5e8",
      borderWidth: 1,
      backgroundOpacity: 100,
      position: "center",
      offsetY: 24,
      roundingValue: 0,
      prefix: "",
      suffix: "",
    },
  },
  translations: {
    period: "Period",
    open: "Open",
    high: "High",
    low: "Low",
    last: "Last",
    volume: "Volume",
  },
  userOptions: {
    show: true,
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
  table: {
    show: false,
    responsiveBreakpoint: 400,
    th: { backgroundColor: "#fafafa", color: "#2D353C", outline: "none" },
    td: {
      backgroundColor: "#FFFFFF",
      color: "#2D353C",
      outline: "none",
      roundingValue: 2,
      prefix: "",
      suffix: "",
    },
  },
});
</script>

<template>
  <VueDataUi component="VueUiCandlestick" :dataset="dataset" :config="config" />
</template>
