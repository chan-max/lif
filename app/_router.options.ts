import type { RouterConfig } from '@nuxt/schema'
import type { RouteRecordRaw } from 'vue-router'


export const useDeviceType = () => {
    let UA: string
    if (process.client)
        // 如果是在客户端执行，则通过 navigator 获取 user-agent
        UA = navigator.userAgent
    else
        // 如果是在服务端执行，则通过请求头获取 user-agent
        UA = useRequestHeader('user-agent') as string

    const type = ref<'mobile' | 'pc'>('pc')

    console.log(UA)

    // 通过 UA 来判断设备类型是 pc 还是 mobile
    if (/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(UA))
        type.value = 'mobile'
    else
        type.value = 'pc'

    return type
}

// 导出路由配置项
export default <RouterConfig>{
    routes: (_routes) => {
        // 思路是这样的：
        // 如果是移动端访问，则给移动端页面删除路由前缀 /mobile ，给PC端页面添加路由前缀 /pc
        // 如果是 PC 端访问，则给 PC 端页面删除路由前缀 /pc ，给移动端页面添加路由前缀 /mobile

        // 当前设备的类型
        const targetType = useDeviceType().value
        // 不是当前设备类型的另一个类型
        const notTargetType = targetType === 'mobile' ? 'pc' : 'mobile'

        // 找到匹配当前设备的所有页面路由
        let targetRoutes = _routes.filter(item => (item.name as string).startsWith(targetType))
        targetRoutes = targetRoutes.map((item) => {
            // 将路由前缀删除
            item.path = item.path.replace(`/${targetType}`, '') === '' ? '/' : item.path.replace(`/${targetType}`, '')
            // 如果 PC 端、移动端 分别使用的是两套 layout，可以使用下面这段代码去指定布局
            // if (!item.meta?.layout) {
            //   item.meta = {
            //     ...item.meta,
            //     layout: `/${targetType}` === '/mobile' ? '移动端布局名' : 'PC 端布局名',
            //   }
            // }
            return item
        })

        // 找到不匹配当前设备的所有页面路由
        let notTargetRoutes = _routes.filter(item => (item.name as string).startsWith(notTargetType))
        notTargetRoutes = notTargetRoutes.map((item) => {
            // 将路由前缀添加上
            if (!item.path.startsWith(`/${notTargetType}`))
                item.path = `/${notTargetType}${item.path}`
            return item
        })

        return [...targetRoutes, ...notTargetRoutes]
    },
}