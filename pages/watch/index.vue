<template>
    <div class="video-parent" v-if="video">
      <section id="mainSection">
        <Iplayer id="videoiPlayer" class="shadow-2xl rounded-2xl mb-4" :playerData="video"/>
        <section id="titleSection">
          <h1 class="text-2xl font-bold mr-2">{{ video.ytData.title }}</h1>
          <nav class="pl-2 pr-2">
            <UButton class="ml-1 mr-1" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons:share" size="md" color="white" variant="solid" id="shareButton" @click="shareContent()" label="Share"/>
            <UButton class="ml-1 mr-1" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons:arrow-top-right-on-square" size="md" color="white" variant="solid" id="goYtBtn" @click="openYouTube()" label="I have problem"/>
          </nav>
        </section>
        <section id="descSection" class="rounded-xl mb-4">
          <p id="externalUpload">{{ video.ytData.author }}</p>
          <p class="text-sm" >{{ video.total_views }} views</p>
          <NuxtTime class="text-sm" :datetime="`${video.created_at}`" relative/>
          <p>{{ video.description }}</p>
        </section>
      </section>
      <SmallLibraryView id="lv-parent"/>
    </div>
  </template>
  
  <script setup>

  const video = computed(() => {
    return data.value
  })
  const currentVideoId = computed(() => {
    return useRoute().query.v
  })
  const currentWebMode = computed(() => {
    return import.meta.dev
  })
  const { error, data, refresh } = useFetch('/dp/watch', {
    baseURL: useRuntimeConfig().public.APIEndpoint,
    query: {
      v: currentVideoId,
      isDev: currentWebMode
    },
    immediate: true,
    deep: true,
    // watch: [currentVideoId],
    method: 'GET',
    key: "watch-api",
    server: true
  })
  watch(() => data.value, (newVal) => {
    
    if(newVal) {
      updateMetaTags()
    }
  }, {immediate: true})
  function updateMetaTags() {
    console.warn("Meta changed!")
    const res = video.value.ytData
      const options = {
        title: res.title,
        htmlAttrs: {lang: 'id'},
        link: [
          {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon.png'
          }
        ],
        meta: [
          { name: 'description', content: 'Watch ' +res.title + ' on darels Project' },
          { property: 'author', content: video.submittedBy },
          { property: 'url', content: window.location.href },
          { property: 'keywords', content: 'darelc,darelisme,darelism,archive,project,dws,web,service,dp' },
          { property: 'og:video:type', content: 'text/html' },
          { property: 'og:title', content: res.title  },
          { property: 'og:description', content: 'Watch ' + res.title  + ' on darels Project' },
          { property: 'og:image', content:res.videoThumbnails[3].url },
          { property: 'og:site_name', content: "darel's Project" },
          { property: 'og:type', content: 'video.other' },
          { property: 'og:video:type', content: 'text/html' },
          { property: 'og:video:width', content: '1280' },
          { property: 'og:video:height', content: '720' },
          { property: 'og:url', content: window.location.href },
          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:title', content: res.title },
          { property: 'twitter:description', content: 'Watch ' + res.title  + ' on darels Project' },
          { property: 'twitter:image', content:res.videoThumbnails[3].url},
        ]
      }
      useHead(options);
    // }
  }
  function shareContent() {
    const res = video.value.ytData
    const shareData = {
      title: res.title,
      text: 'Watch '+res.title+' on darel\'s Project!',
      url: window.location.href
    };
  
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Content shared successfully'))
        .catch((error) => console.error('Error sharing content:', error));
    } else {
      // alert('Web Share API is not supported in your browser.');
      console.error("Web Share is not supported in your browser!")
    }
  }
  function openYouTube() {
    navigateTo("https://youtu.be/"+video.value.vid_uid, {external: true})
  }
  
  </script>
  
  <style scoped>
  #titleSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #videoiPlayer{
    min-height: 30vh;
    max-height: 70vh;
    height:100%;
    width: auto;
  }
  #externalUpload {
    padding: 5px;
    margin-top: 5px;
    margin-left: -5px;
    background-color: var(--color-background-mute);
    border-radius: 5px;
    width:fit-content;
  }
  iframe {
    border: none;
  }
  @media (min-width: 1015px) {
    #mainSection {
      width: 65%;
    }
    #lv-parent {
      width: 35%;
      padding: 0 0rem 0 2rem;
      margin-top:-10px;
    }
    .video-parent {
      display: flex;
      flex-direction: row;
      /* align-items: flex-start; */
    }
    #vp {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 1015px) {
    #vp {
      margin-bottom: 30px;
    }
  }
  </style>
  