import config from './config'

import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineNuxtConfig({
  ssr: false,
  // ssr:true,target:'static',
  vite: {
    plugins: [vueJsx(),], // 加载 Vue JSX 插件

  },
  typescript: {
    shim: false, // 禁用 shim，提高类型推断能力
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: `${config.brandName} - ${config.tagline}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: config.metaDescription },
        { hid: 'keywords', name: 'keywords', content: config.metaKeywords },

        { name: 'google-site-verification', content: 'RxzvybBzhRLs6_sRKyieVlgNGdkRfxpPM819uINVRE8' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: config.favicon },
      ],
      script: [
        {
          src: '/fullpage.js',
          type: 'text/javascript',
          defer: true,
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      appEnv: process.env.NODE_ENV || 'development',
      baseURL: process.env.BASE_URL || 'http://localhost:3000',
      apiURL: process.env.API_URL || config.apiURL,
      apiKey: process.env.API_KEY || config.apiKey,
    },
  },
  devtools: { enabled: true },
  css: ['~/public/fullpage.css', '~/assets/main.scss', '~/assets/md.scss', 'animate.css/animate.min.css', 'v-calendar/dist/style.css', 'vue-data-ui/style.css'],
  build: {
    transpile: ['element-plus'], // 确保正确编译 Element Plus
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    "@nuxt/image",
    '@ant-design-vue/nuxt',
    "@stefanobartoletti/nuxt-social-share",
    '@pinia/nuxt',
    'nuxt-paypal',
    '@nuxtjs/i18n',
    '@nuxt/content',
    'nuxt-paypal',
    '@nuxtjs/color-mode',
    'nuxt-echarts',
    '@samk-dev/nuxt-vcalendar',
  ],
  // gtm: {
  //   id: config.gtmID,
  //   defer: false,
  // },
  site: {
    url: process.env.BASE_URL || 'http://localhost:1234',
  },
  sitemap: {
    cacheMaxAgeSeconds: 60 * 60 * 24,
    xsl: false,
    sitemaps: true,
    autoLastmod: true,
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  i18n: {
    lazy: true, // Enable lazy loading
    strategy: 'no_prefix', // URL strategy
    vueI18n: './i18n.config.ts', // Path to Vue I18n configuration
    locales: ["en", "zh"], //配置语种
  },
  paypal: {
    clientId: 'AdOWq5VdofoxJKPNX7U7SMKF-pdRrzjbZ5aftu_peFlDFsSx-m2BpO8_tkSCngK3hHTOvYyQq_0mm73T',
    // ...options
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    // fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },
})