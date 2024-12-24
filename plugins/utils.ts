function formatDate(date) {
  if (!date) {
    return ''
  }
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en', options)
}

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      // now available in templates as `$formatDate`
      formatDate,
      articleDate: (article) => formatDate(article.updatedAt || article.date),
      slug: (item) => item._stem.substring(9),
    },
  }
})
