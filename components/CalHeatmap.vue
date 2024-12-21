<script setup lang="ts">
import { onMounted, ref } from "vue";
import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import "cal-heatmap/cal-heatmap.css";
import LegendLite from "cal-heatmap/plugins/LegendLite";
import Legend from "cal-heatmap/plugins/Legend";
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
import dayjs from "dayjs";

const heatmapContainer = ref(null); // 使用 ref 引用 DOM 元素
const cal = new CalHeatmap();

function paintCalendar() {
  if (!heatmapContainer.value) {
    console.error("Heatmap container is not available.");
    return;
  }

  const today = new Date();

  cal.paint(
    {
      data: [
        { t: 1673388319933, p: 3, v: "Asia" },
        { t: 1673388319934, p: 6, v: "Europe" },
      ],
      date: { start: new Date("2012-01-01") },
      range: 12,
      scale: {
        color: {
          type: "threshold",
          range: ["#14432a", "#166b34", "#37a446", "#4dd05a"],
          domain: [10, 20, 30],
        },
      },
      domain: {
        type: "month",
        gutter: 4,
        label: { text: "MMM", textAlign: "start", position: "top" },
      },
      subDomain: { type: "ghDay", radius: 2, width: 11, height: 11, gutter: 4 },
    },

    [
      [
        Tooltip,
        {
          text: function (date, value, dayjsDate) {
            return (value ? value + "°C" : "No data") + " on " + dayjsDate.format("LL");
          },
        },
      ],
      [
        Legend,
        {
          tickSize: 0,
          width: 150,
          itemSelector: "#ex-year-legend",
          label: "Seattle max temperature °C",
        },
      ],
      [
        CalendarLabel,
        {
          width: 30,
          textAlign: "start",
          text: () => dayjs.weekdaysShort().map((d, i) => (i % 2 == 0 ? "" : d)),
        },
      ],
    ]
  );
}

onMounted(() => paintCalendar());
</script>

<template>
  <div class="h-full w-full overflow-auto flex items-center justify-center">
    <div ref="heatmapContainer" id="cal-heatmap"></div>
  </div>
</template>

<style scoped></style>
