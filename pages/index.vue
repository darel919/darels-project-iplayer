<template>
    <h1 class="text-2xl font-bold">Welcome to darel's Project</h1>
    <div v-for="video in data" :key="video.content_id">
      <NuxtLink :to="{name: 'watch', query: {v: video.content_id}}" class="video-items">
          <NuxtImg class="rounded" loading="lazy" sizes="md:256px" width="160" :placeholder="[160, 90]" :src="`${video.ytData.videoThumbnails[4].url}`" :alt="`${video.ytData.title}'s thumbnail`"/>
          <section>
            <h2 class="font-semibold">{{ video.ytData.title }}</h2>
            <NuxtTime class="text-xs" :datetime="`${video.created_at}`" relative/>
            <p class="text-xs">{{ video.total_views }} views</p>
          </section>
      </NuxtLink>
    </div>

    <!-- <UButton label="Test" @click="toast.add({title: 'Test'})"/> -->
</template>

<script setup>
const toast = useToast()
const { error, data } = useFetch('/dp', {
  baseURL: useRuntimeConfig().public.APIEndpoint,
  query: {
    sortBy: 'desc'
  },
  method: 'GET',
  immediate: true,
  watch: false,
})
onMounted(() => {
    setMetadata()
})
function setMetadata() {
  const options = {
    title: "Home",
    meta: [
      { name: 'description', content: 'Replay archives of memories on darel Projects!' },
      { property: 'og:title', content:  "darel's Project", },
      { property: 'og:description',content: 'Replay archives of memories on darel Projects!' },
      { property: 'og:image', content: 'https://projects.darelisme.my.id/favicon.png' },
      { property: 'og:url', content: window.location.href },
    ]
  }
  useHead(options)
}

</script>
<style scoped>
.video-items {
  display: flex;
  align-items: center;
  padding: 1rem 0 1rem 0;
}
.video-items img {
  margin-right:1rem;
}
</style>