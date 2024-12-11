<script setup>
import { ref } from "vue";
import { foodCompositions } from "@/common/enum/food.ts";

const config = ref({
  responsiveBreakpoint: 400,
  userOptions: {
    show: true,
    position: "right",
    buttons: {
      tooltip: false,
      pdf: true,
      csv: true,
      img: true,
      table: false,
      labels: false,
      fullscreen: true,
      sort: false,
      stack: false,
      animation: true,
      annotator: false,
    },
    buttonTitles: {
      open: "Open options",
      close: "Close options",
      pdf: "Download PDF",
      csv: "Download CSV",
      img: "Download PNG",
      fullscreen: "Toggle fullscreen",
      animation: "Toggle animation",
    },
  },
  animation: {
    use: true,
    speedMs: 1000,
    pauseOnHover: true,
  },
  style: {
    backgroundColor: "#FFFFFFff",
    color: "#1A1A1Aff",
    fontFamily: "inherit",
  },
  border: {
    size: 0,
    color: "#2D353Cff",
  },
  caption: {
    text: "Table title",
    padding: {
      top: 12,
      right: 12,
      bottom: 12,
      left: 12,
    },
    style: {
      backgroundColor: "#FFFFFFff",
      color: "#1A1A1Aff",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "left",
    },
  },
  scrollbar: {
    showOnlyOnHover: false,
    hide: false,
  },
  thead: {
    style: {
      verticalAlign: "middle",
    },
    tr: {
      height: 32,
      border: {
        size: 0,
        color: "#2D353Cff",
      },
      style: {
        backgroundColor: "#FFFFFFff",
        color: "#1A1A1Aff",
        boxShadow: "0px 6px 12px -6px #1A1A1A50",
      },
      th: {
        border: {
          size: 0,
          color: "#2D353Cff",
        },
        padding: {
          top: 0,
          right: 12,
          bottom: 0,
          left: 0,
        },
        style: {
          borderSpacing: 0,
          border: "none",
          textAlign: "right",
          fontVariantNumeric: "tabular-nums",
        },
      },
    },
  },
  tbody: {
    tr: {
      visible: 5,
      height: 32,
      border: {
        size: 0,
        color: "#2D353Cff",
      },
      style: {
        backgroundColor: "#FFFFFFff",
        color: "#1A1A1Aff",
      },
      td: {
        alternateColor: true,
        alternateOpacity: 0.5,
        border: {
          size: 0,
          color: "#2D353Cff",
        },
        padding: {
          top: 0,
          right: 12,
          bottom: 0,
          left: 0,
        },
        style: {
          fontVariantNumeric: "tabular-nums",
          textAlign: "right",
          backgroundColor: "#e1e5e8ff",
        },
      },
    },
  },
});

const dataset = ref({
  head: ["元素", "英文", "描述", "KEY"],
  body: foodCompositions.map((item) => [
    item.chineseName,
    item.name,
    item.description,
    item.key,
  ]),
});
</script>

<template>
  <div class="p-12 flex items-center w-full h-full justify-center">
    <div class="w-full h-full">
      <DataUI component="VueUiCarouselTable" :config="config" :dataset="dataset" />
    </div>
  </div>
</template>
