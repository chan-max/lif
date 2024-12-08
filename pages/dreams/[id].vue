<template>
  <template v-if="!res?.data?.id">
    <div>empty</div>
  </template>

  <template v-else>
    <h1 class="text-5xl">{{ res?.data.title_en }}</h1>
    <br />
    <p v-html="res?.data.message_en"></p>
  </template>
</template>

<script setup>
import { useRoute } from "vue-router";
import Api from "@/common/api/axios";

let route = useRoute();

let id = route.params.id;

let res = ref();

async function init() {
  res.value = await Api.getDreamById(id);
}

init();
</script>
