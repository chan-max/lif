<template>
  <Heatmap-template :values="values" :end-date="new Date()"></Heatmap-template>
</template>
<script setup>
import Api, { usePromise } from "@/common/api/axios";

let { data, init } = usePromise(Api.getAnalysis, {
  onResolve(res) {
 
    values.value = res.totalRecordCount.map((item) => {
      return {
        date: item.date,
        count: item.recordCount,
      };
    });
    return res;
  },
});
init();

const values = ref([]);
</script>
