// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://content.nuxt.com
    '@nuxt/content',
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
  ],

  routeRules: {
    '/': { prerender: true },
  },

  /*
   ** Content module configuration
   ** See https://content.nuxt.com/get-started/configuration
   */
  content: {
    markdown: {},
    highlight: {
      theme: 'material-theme-ocean',
    },
  },

  compatibilityDate: '2024-12-22',
})
