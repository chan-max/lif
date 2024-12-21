<template>
  <CalendarHeatmap
    class="w-full h-full"
    v-bind="$attrs"
    :darkMode="true"
    :locale="locale"
    :round="2"
    :rangeColor="rangeColor"
    :tooltipFormatter="tooltipFormatter"
  ></CalendarHeatmap>
</template>
<script setup>
import CalendarHeatmap from "./vue3-heatmap.vue";
import "./style.css";
function tooltipFormatter(v) {
  return `${v.date.getFullYear()}年${v.date.getMonth() + 1}月${v.date.getDate()}日，共添加${
    v.count
  } 条记录`;
}

const rangeColor = [
  "rgba(0,0,0,0.2)",
  "rgba(0,0,0,0.2)",
  "rgba(0,250,0,0.6)",
  "rgba(0,250,0,0.7)",
  "rgba(0,250,0,0.8)",
  "rgba(0,250,0,0.9)",
];

const locale = {
  months: [
    // "Jan",
    // "Feb",
    // "Mar",
    // "Apr",
    // "May",
    // "Jun",
    // "Jul",
    // "Aug",
    // "Sep",
    // "Oct",
    // "Nov",
    // "Dec",
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ],
  days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  on: "on",
  less: "偶尔",
  more: "频繁",
};
</script>
