<template>
  <div class="flex justify-between">
    <NuxtLink
      v-if="prev"
      :to="{ name: 'blog-slug', params: { slug: $slug(prev) } }"
      class="text-primary font-bold hover:underline"
    >
      {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink v-if="next" :to="{ name: 'blog-slug', params: { slug: $slug(next) } }" class="font-bold hover:underline">
      {{ next.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  prev: {
    type: Object,
    default: () => null,
  },
  next: {
    type: Object,
    default: () => null,
  },
})
</script>
