<template>
  <ClientOnly>
    <VueDataUi component="VueUiStackbar" :dataset="dataset" :config="config"> </VueDataUi>
  </ClientOnly>
</template>

<script setup>
import Api from "@/common/api/axios";
import { usePromise } from "@/common/hooks/promise";
import { sleepCategories } from "~/common/enum/record/sleep";

let { data: data, init: init } = usePromise(Api.getDayrecordLastest, {
  onResolve(res) {},
});

const dataset = [
  {
    name: "Serie 1",
    series: [19, 20.07, 30, 40, 50, 60],
  },
  {
    name: "Serie 2",
    series: [13, 8, 9, 13, 25, 27],
  },
  {
    name: "Serie 3",
    series: [13, 10, 9, 13, 25, 19],
  },
  {
    name: "Serie 4",
    series: [25, 23, 9, 13, 25, 31],
  },
];

const config = ref({
  theme: "",
  responsive: true,
  customPalette: [],
  useCssAnimation: true,
  orientation: "vertical",
  table: {
    show: false,
    responsiveBreakpoint: 400,
    columnNames: { period: "Period", total: "Total" },
    th: { backgroundColor: "#fafafa", color: "#2D353C", outline: "none" },
    td: {
      backgroundColor: "#FFFFFF",
      color: "#2D353C",
      outline: "none",
      roundingValue: 0,
    },
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
      labels: true,
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
      labels: "Toggle labels",
      fullscreen: "Toggle fullscreen",
      annotator: "Toggle annotator",
    },
  },
  style: {
    fontFamily: "inherit",
    chart: {
      backgroundColor: "transparent",
      color: "#2D353C",
    //   height: 500,
    //   width: 800,
      padding: { top: 24, right: 10, bottom: 10, left: 36 },
    //   title: {
    //     text: "近一周睡眠统计",
    //     color: "#ffffff",
    //     fontSize: 20,
    //     bold: true,
    //     textAlign: "left",
    //     paddingLeft: 0,
    //     paddingRight: 0,
    //     subtitle: { color: "#A1A1A1", text: "", fontSize: 16, bold: false },
    //   },
      legend: {
        show: true,
        bold: false,
        backgroundColor: "transparent",
        color: "#ffffff",
        fontSize: 12,
      },
      zoom: {
        show: false,
        color: "#CCCCCC",
        highlightColor: "#4A4A4A",
        fontSize: 12,
        useResetSlot: false,
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
        showValue: true,
        showPercentage: true,
        roundingValue: 0,
        roundingPercentage: 0,
      },
      highlighter: { color: "#2D353C", opacity: 5 },
      bars: {
        gapRatio: 0.5,
        distributed: false,
        showDistributedPercentage: true,
        borderRadius: 5,
        strokeWidth: 1,
        gradient: { show: true, intensity: 20 },
        totalValues: {
          show: true,
          offsetY: 12,
          fontSize: 12,
          bold: true,
          color: "#ffffff",
        },
        dataLabels: {
          show: true,
          adaptColorToBackground: true,
          color: "#2D353C",
          fontSize: 14,
          bold: false,
          rounding: 0,
          prefix: "",
          suffix: "",
          formatter: null,
        },
      },
      grid: {
        scale: { ticks: 10, scaleMin: null, scaleMax: null },
        x: {
          showAxis: true,
          showHorizontalLines: false,
          axisColor: "#e1e5e8",
          axisThickness: 2,
          axisName: {
            show: true,
            text: "",
            fontSize: 14,
            color: "#ffffff",
            bold: false,
            offsetY: 0,
          },
          timeLabels: {
            show: true,
            values: [],
            offsetY: 0,
            rotation: 0,
            fontSize: 14,
            color: "#ffffff",
            bold: false,
          },
        },
        y: {
          showAxis: true,
          showVerticalLines: false,
          axisColor: "#ffffff",
          axisThickness: 2,
          axisName: {
            show: true,
            text: "",
            fontSize: 14,
            color: "#ffffff",
            bold: false,
            offsetX: 0,
          },
          axisLabels: { show: true, color: "#ffffff", fontSize: 14, bold: false },
        },
      },
    },
  },
});
</script>
