<template>
  <div class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row">
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img :src="tag.img" :alt="tag.name" class="absolute h-full w-full object-cover" />
    </div>

    <div class="overlay"></div>
    <div class="absolute top-32 left-32 right-32 text-white">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
      <div class="mt-16 -mb-3 flex flex-col text-sm">
        <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
          <h1 class="text-4xl font-bold uppercase text-shadow-xl">
            {{ tag.name }}
          </h1>
          <p class="bg-slate-800 bg-opacity-60 rounded-md p-4 text-shadow-xl text-lg">{{ tag.description }}</p>
        </div>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <NuxtLink to="/"><p class="hover:underline">Back to All Articles</p></NuxtLink>
      <h3 class="mb-4 font-bold text-4xl">Articles tagged {{ tag.name }}:</h3>
      <ul>
        <li v-for="article in articles" :key="article._id" class="w-full px-2 xs:mb-6 md:mb-12 article-card">
          <NuxtLink
            :to="{ name: 'blog-slug', params: { slug: $slug(article) } }"
            class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
          >
            <img
              v-if="article.img"
              class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
              :src="article.img"
              :alt="article.alt"
            />

            <div class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full">
              <h2 class="font-bold">{{ article.title }}</h2>
              <p>{{ article.description }}</p>
              <p class="font-bold text-gray-600 text-sm">
                {{ $articleDate(article) }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: tag } = await useAsyncData(
  'get-tag',
  () => queryContent('tags')
    .where({ name: { $contains: route.params.name } })
    .where({ draft: { $ne: true } })
    .findOne(),
)

const { data: articles } = await useAsyncData(
  'get-tag-articles',
  () => queryContent('articles').
    where({ 'tags': { $icontains: route.params.name } }).
    where({ draft: { $ne: true } }).
    without('body').
    sort({ date: -1 }).
    find(),
)
</script>
