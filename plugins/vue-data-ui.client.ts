import { VueUiXy, VueDataUi } from "vue-data-ui";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VueUiXy", VueUiXy);
    nuxtApp.vueApp.component("VueDataUi", VueDataUi);
})