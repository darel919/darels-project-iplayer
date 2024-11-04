<template>
  <Iplayer id="iplayer" :playerData="video" v-if="video"/>
  <div v-else>
    <h1>Loading player...</h1>
  </div>
</template>

<script setup>
const video = ref(null)
onMounted(() => {
  runiPlayerFetcher()
})
async function runiPlayerFetcher() {
  const videoData = await $fetch('/dp/watch', {
    query: {
      v: useRoute().query.v
    },
    baseURL: useRuntimeConfig().public.APIEndpoint
  })
  if(videoData) {
    // console.log(videoData)
    video.value = videoData;
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