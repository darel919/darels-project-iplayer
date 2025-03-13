<template>
  <ClientOnly>
    <Iplayer id="iplayer" :playerData="video" v-if="video"/>
  </ClientOnly>
 
  <div v-if="!video && videoId && !errorMsg" id="loadingBg" class="items-center p-8">
    <!-- <img :src="bgUrl" id="fullScreenImg"> -->
    <UIcon name="i-heroicons:cloud-arrow-down-16-solid" class="text-5xl"></UIcon>
    <UProgress animation="swing" class="mb-4"/>
    <h1 class="text-2xl font-bold">Loading...</h1>
    <h2>darel's Projects iPlayer</h2>
    <p class="text-xs">ID: {{ videoId }}</p>
  </div>
  <div v-if="errorMsg" class=" p-4">
    <h1 class="text-4xl">Can't play this title.</h1>
    <p>ID: {{ videoId }}</p>
    <p class="mt-4">{{ errorMsg }}</p>
  </div>
</template>

<script setup>
const video = ref(null)
const bgUrl = ref(null);
const videoId = useRoute().query.v
const errorMsg = ref(null)
onMounted(() => {
  if(!useRoute().query.v) {
    alert("No valid video ID supplied!")
    if(process.env.NODE_ENV !== 'development') {
      window.close();
    }
  } else {
    useLoadingIndicator().start()
    runiPlayerFetcher()
  }
})
async function runiPlayerFetcher() {
  useLoadingIndicator().set(50)
  try {
    const videoData = await $fetch('/dp/watch', {
    query: {
      v: useRoute().query.v
    },
    headers: {
      app: 'dp-iPlayer'
    },
    baseURL: useRuntimeConfig().public.APIEndpoint
  })
    useLoadingIndicator().set(90)
    video.value = videoData;
    bgUrl.value = `${useRuntimeConfig().public.APIEndpoint}/dp/thumb?id=${useRoute().query.v}`;
    useLoadingIndicator().finish()
  } catch (e) {
    errorMsg.value = `${e.status} - ${e.statusText}`
    useLoadingIndicator().finish()
    console.error(`${e}\n\n${e.data.code} ${e.data.message}`)
    // alert(`Error playing this title. ${e.message}`)
  }

}
</script>
<style scoped>
#fullScreenImg {
  z-index: -10;
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  opacity: 0.3;
  /* filter: blur(5px); */
  top:0;
  right:0;
  left:0;
  bottom:0;
}
#iplayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: inherit;
  overflow: hidden;
}
.hidden { display: none; }
</style>