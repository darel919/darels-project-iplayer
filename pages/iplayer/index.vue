<template>
  <ClientOnly>
    <Iplayer id="iplayer" :playerData="video" v-if="video"/>
  </ClientOnly>
 
  <div v-if="!video" class="">
    <UIcon name="i-heroicons:cloud-arrow-down-16-solid" class="text-5xl"></UIcon>
    <UProgress animation="swing" class="mb-4"/>
    <h1 class="text-2xl font-bold">Loading...</h1>
    <h2>darel's Projects iPlayer</h2>
  </div>
</template>

<script setup>
const video = ref(null)
onMounted(() => {
  useLoadingIndicator().start()
  runiPlayerFetcher()
})
async function runiPlayerFetcher() {
  useLoadingIndicator().set(50)
  const videoData = await $fetch('/dp/watch', {
    query: {
      v: useRoute().query.v
    },
    headers: {
      app: 'dp-iPlayer'
    },
    baseURL: useRuntimeConfig().public.APIEndpoint
  })
  if(videoData) {
    useLoadingIndicator().set(90)
    video.value = videoData;
    useLoadingIndicator().finish()
  } else {
    useLoadingIndicator().finish()
    alert("Error playing this title.")
  }
}
</script>
<style scoped>

#iplayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: inherit;
  overflow: hidden;
}
</style>