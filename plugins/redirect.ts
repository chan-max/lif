// plugins/device-detect.ts
import { defineNuxtPlugin, useRoute, useRouter } from '#app'
import { nextTick } from 'vue'

export default defineNuxtPlugin(() => {
    const route = useRoute()
    const router = useRouter()

    // 判断是否为移动端
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    // 使用 nextTick 确保路由已加载后再执行跳转
    nextTick(() => {
        // 如果是移动端设备并且当前页面不是移动端页面，则跳转

        if (isMobile && route.path !== '/m') {
            router.push('/m') // 使用 router.push 进行跳转
        }
    })
})
