// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  routeRules: {
    '/': {prerender: true},
    '/iplayer': {ssr: false},
  },
  runtimeConfig: {
    public: {
      APIEndpoint: 'http://10.10.10.10:328'
      // APIEndpoint: process.env.NODE_ENV === 'development' ? 'http://10.10.10.10:328': 'https://darelisme.my.id/api',
    }
  },

  modules: ['@nuxt/image', '@nuxt/ui', '@nuxtjs/sitemap', '@nuxtjs/robots', '@nuxtjs/seo', '@nuxtjs/html-validator', 'nuxt-time'],
})