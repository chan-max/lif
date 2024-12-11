import { useLocalStorage } from "@vueuse/core";
import { useLoginStatusStore } from "./store/login";


// 使用 localStorage 保存主题状态
export const colorMode = useLocalStorage("colorMode", "dark");

export function getUserDefaultAvatar() {
    return '/default-avatar.svg'
}