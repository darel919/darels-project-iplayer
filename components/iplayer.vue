<template>
  <div class="video-parent">
    <main>
      <video ref="videoRef" v-if="isSelfMode" id="video" controls autoplay preload="auto"/>
      <iframe v-else class="iplayer" loading="eager" title="Player" allowfullscreen allow="autoplay" :src="`https://inv.nadeko.net/embed/${video.vid_uid}?autoplay=1&continue=0&related_videos=false&player_style=youtube&local=${useProxy}&subtitles=id&quality=dash&quality_dash=auto&comments=false&extend_desc=false&thinmode=true`"/>
      <h1 v-if="errorMsg">Can't play this title right now. Sorry about that!</h1>
    </main>
  </div>
</template>

<script setup>
import Hls from 'hls.js';

let hls;
const videoRef = ref(null);
const props = defineProps(['playerData']);
const video = computed(() => props.playerData);
const isSelfMode = ref(false);
const errorMsg = ref(null);
const isSelfPreferred = ref(true);
const useProxy = ref(false);
const runtimeConfig = useRuntimeConfig(); // Ensure it's in the correct context

watch(() => props.playerData, async (newVal) => {
  if (newVal.selfHostUrl) {
    isSelfMode.value = true;
    await nextTick(); // Wait for the DOM to update
    initializeVideo();
  } else {
    isSelfMode.value = false;
    if (hls) {
      hls.destroy();
    }
  }
}, { immediate: true });

async function initializeVideo() {
  await nextTick(); // Wait for the next DOM update cycle
  const videoComp = videoRef.value;
  if (!videoComp) {
    console.error('Video element is not ready');
    return;
  }

  const hlsUrl = runtimeConfig.public.APIEndpoint + video.value.selfHostUrl;
  // console.log(hlsUrl);

  if (Hls.isSupported()) {
    if (hls) {
      hls.destroy(); // Clean up previous HLS instance
      console.warn("Cleaning previous players");
    }
    console.log("Playing HLS stream");
    hls = new Hls();
    hls.loadSource(hlsUrl);
    hls.attachMedia(videoComp);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      videoComp.play();
    });
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoComp.play();
      // console.log("Ready to play HLS");
    });
  } else if (videoComp.canPlayType('application/vnd.apple.mpegurl')) {
    videoComp.src = hlsUrl;
    videoComp.addEventListener('loadedmetadata', () => {
      videoComp.play();
    });
  }
}

onMounted(() => {
  if (isSelfMode.value) {
    nextTick(() => {
      initializeVideo();
    });
  }
});
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
  height: 100vh;
}
video, iframe {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
