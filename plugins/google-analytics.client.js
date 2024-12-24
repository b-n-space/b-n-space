import VueGtag, { trackRouter } from 'vue-gtag-next'

// Todo: enable GDPR https://www.carlcassar.com/articles/add-google-analytics-to-a-nuxt-js-app/
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    // isEnabled: process.env.NODE_ENV === 'production',
    isEnabled: false,
    appName: 'BN_SPACE',
    property: {
      id: 'G-LW1E8NZE34',
    },
  })
  trackRouter(useRouter())
})
