import { useLocalStorage } from "@vueuse/core";


// 使用 localStorage 保存主题状态
export const colorMode = useLocalStorage("colorMode", "dark");
