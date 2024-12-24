<template>
  <article class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row">
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img :src="article.img" :alt="article.alt" class="absolute h-full w-full object-cover" />
      <div class="overlay"></div>
      <div class="absolute top-32 left-32 text-white">
        <NuxtLink to="/">
          <Logo />
        </NuxtLink>
        <div class="mt-16 -mb-3 flex uppercase text-sm text-shadow-xl">
          <p class="mr-3">
            {{ $articleDate(article) }}
          </p>
          <span class="mr-3">•</span>
          <p>{{ article.author.name }}</p>
        </div>
        <h1 class="hidden lg:block text-6xl font-bold text-shadow-xl">{{ article.title }}</h1>
        <span v-for="tag in tags" :key="tag._stem">
          <NuxtLink :to="`/blog/tag/${tag.name}`">
            <span
              class="truncate uppercase tracking-wider font-medium text-ss px-2 py-1 rounded-full mr-2 mb-2 border border-light-border dark:border-dark-border transition-colors duration-300 ease-linear"
            >
              {{ tag.name }}
            </span>
          </NuxtLink>
        </span>
      </div>
      <div class="flex absolute top-3rem right-3rem">
        <NuxtLink to="/" class="mr-8 self-center text-white font-bold hover:underline text-shadow-xl">
          All articles
        </NuxtLink>
        <AppSearchInput />
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <h1 class="font-bold text-4xl">{{ article.title }}</h1>
      <p v-if="$articleDate(article)" class="pb-4">Post last updated: {{ $articleDate(article) }}</p>
      <!-- table of contents -->
      <nav v-if="article.showToc" class="pb-6">
        <ul>
          <li
            v-for="link of article.toc"
            :key="link.id"
            :class="{
              'font-semibold': link.depth === 2,
            }"
          >
            <nuxtLink
              :to="`#${link.id}`"
              class="hover:underline"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3,
              }"
            >{{ link.text }}
            </nuxtLink>
          </li>
        </ul>
      </nav>
      <!-- content from markdown -->
      <ContentRenderer :value="article" class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"></ContentRenderer>
      <!-- content author component -->
      <Author :author="article.author" />
      <!-- prevNext component -->
      <PrevNext :prev="prev" :next="next" class="mt-8" />
    </div>
  </article>
</template>
<script setup lang="ts">
const route = useRoute()

console.debug({ slug: route.params.slug })
const { data: article } = await useAsyncData(
  'get-article',
  () => queryContent('articles')
    .where({ _path: { $contains: route.params.slug } })
    .where({ draft: { $ne: true } })
    .findOne(),
)

console.debug({ article: article.value })
console.debug({ articleTags: [...article.value.tags] })
const { data: tags } = article.value.tags ? await useAsyncData(
  'get-article-tags',
  () => queryContent('tags')
    .only(['name', '_stem'])
    .where({ name: { $containsAny: [...article.value.tags] } })
    .find(),
) : { data: [] }
console.debug({ tags: [...tags.value] })


const { data: { value: [prev, next] } } = await useAsyncData(
  'get-article-prev-next',
  () => queryContent('articles')
    .only(['title', '_stem'])
    .where({ draft: { $ne: true } })
    .sort({ date: 1 })
    // .find()
    .findSurround(article.value._path),
)
console.debug({ prev, next })

useHead({
  title: `${article.value.title} | Bᴺ Space`,
  meta: [
    { name: 'description', content: article.value.description || '' },
    { name: 'og:image', content: article.value.img || '' },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
})

</script>
<style>
.nuxt-content p {
  margin-bottom: 20px;
}

.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}

.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}

.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
