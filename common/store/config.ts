

import { defineStore } from "pinia"
import { ref } from 'vue'
import Api from '@/common/api/axios'

export async function initConfigStoreBasicConfig() {
    const configStore = useConfigStore()
    const config = await Api.getBasicConfig()
    configStore.$patch(config as any)
}


export const useConfigStore = defineStore("global_config", () => {

    const ok = ref(false)

    // 文件对象存储
    const cos = ref()

    const json = ref({} as any)
    // 本地配置，可以通过json文件修改
    fetch('/project.config.json')
        .then(response => {
            if (!response.ok) {
                console.log('project.config.json laod error')
            }
            return response.json();
        })
        .then(data => {
            json.value = data
        })
        .catch(error => {
            console.log('project.config.json laod error')
        });
    return {
        ok,
        cos,
        json
    }
})