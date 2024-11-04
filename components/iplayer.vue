<template>
    <div class="video-parent">
      <main>
        <video v-if="isSelfMode" id="video" controls autoplay/>
        <iframe v-else class="iplayer" loading="eager" title="Player" allowfullscreen allow="autoplay" :src="`https://inv.nadeko.net/embed/${video.vid_uid}?autoplay=1&continue=0&related_videos=false&player_style=youtube&local=true&subtitles=id&quality=dash&quality_dash=auto&comments=false&extend_desc=false&thinmode=true`"/>
        <h1 v-if="errorMsg">Can't play this title right now. Sorry about that!</h1>
      </main>
    </div>
</template>
  
  <script setup>

  const route = useRoute()
  const videoId = ref(null);
  const video = ref(null);
  const errorMsg = ref(null);
  const isSelfMode = ref(false);
  import Hls from 'hls.js';

  onMounted(() => {
    const videoComp = document.getElementById('video');
    if(isSelfMode.value) {
      const hlsUrl = useRuntimeConfig().public.APIEndpoint+video.value.selfHostUrl;
        if (Hls.isSupported()) {
          // console.log(hlsUrl)
          console.log("Playing HLS stream")
          const hls = new Hls();
          hls.loadSource(hlsUrl);
          hls.attachMedia(videoComp);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoComp.play();
          });
        } else if (videoComp.canPlayType('application/vnd.apple.mpegurl')) {
          videoComp.src = hlsUrl;
          videoComp.addEventListener('loadedmetadata', () => {
            videoComp.play();
          });
        }
    } else {
      console.warn("Not HLS stream. Using iFrame")
    }
  })
  
  watch(() => route.query.v, (newVal) => {
    useLoadingIndicator().start()
    useLoadingIndicator().set(20)
    videoId.value = newVal
  }, {immediate: true})
  
  watch(() => videoId.value, () => {
    useLoadingIndicator().start()
    useLoadingIndicator().set(20)
  }, {immediate: true})
  
  const { data, status, error } = await useFetch('/dp/watch', {
    query: {
      v: videoId
    },
    headers: {
      app: 'dpOnNuxt-iplayer'
    },
    baseURL: useRuntimeConfig().public.APIEndpoint,
  })
  
  watch(() => data.value, (newVal) => {
  if(newVal) {
  video.value = newVal
    useLoadingIndicator().set(50)
    if(newVal) {
      useLoadingIndicator().finish()
    }
    
    if(newVal.selfHostUrl) {
      // console.warn("Self host mode on!")
      isSelfMode.value = true;
    } else {
      // console.log("Using YouTube Player")
      isSelfMode.value = false;
    }
  }
  }, {immediate: true})

  if(error.value) {
    console.error(error)
    errorMsg.value = error.value
  }

  </script>
  
  <style scoped>
.video-parent, main, video, iframe {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}
main {
  position: relative;
  width: 100%;
  height: 100%;
}
video {
  width: 100%;
}
iframe {
  height:100vh;
}
video, iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
  </style>
  