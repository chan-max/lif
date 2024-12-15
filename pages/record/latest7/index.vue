<template>

    {{ data }}
</template>

<script setup>
import Api from "@/common/api/axios";
import { usePromise } from "@/common/hooks/promise";



const {data,init} = usePromise(Api.getDayrecordLastest7)

init()
</script>
