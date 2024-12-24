<template>
  <div>
    <input
      v-model="searchQuery"
      type="search"
      autocomplete="off"
      placeholder="Search Articles"
      class="block w-full pl-10 pr-3 py-2 truncate leading-5 placeholder-gray-500 border border-gray-500 text-gray-700 focus:border-gray-300 rounded-md focus:outline-none focus:bg-white bg-white"
    />
    <ul
      v-if="articles.length"
      class="z-10 absolute w-auto flex-1 top-40 bg-white dark:bg-gray-900 rounded-md border border-gray-300 overflow-hidden"
    >
      <li v-for="article of articles" :key="article._id">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: $slug(article) } }"
          class="flex px-4 py-2 items-center leading-5 transition ease-in-out duration-150 text-green-500 hover:text-black"
        >
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')
// Todo (Nour): improve search; use `searchContent`
const { data: articles } = await useAsyncData(
  'search-articles',
  () => {
    if (!searchQuery.value) {
      return []
    }
    return queryContent('articles')
      .where({ draft: { $ne: true } })
      .where({ title: { $icontains: searchQuery.value } })
      .without('body')
      .sort({ date: -1 })
      .limit(6)
      .find()
  },
  {
    watch:
      [searchQuery],
  },
)
</script>
