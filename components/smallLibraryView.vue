<template>
  <div class="lv-parent">
    <div v-for="video in videos" :key="video.content_id">
      <NuxtLink
        v-if="video.ytData"
        v-show="video.content_id != currentId"
        class="video-item"
        :to="`${'/watch?v='+video.content_id}`"
        :title="video.ytData.title"
      >
        <div class="img-thumb">
          <NuxtImg loading="lazy"
            width="123"
            height="78"
            v-if="video"
            :src="`${video.ytData.videoThumbnails[4].url}`"
          />
          <p>{{ convertSecondsToMMSS(video.ytData.lengthSeconds) }}</p>
        </div>
        <div class="video-item-data-2">
          <h1>{{ video.ytData.title }}</h1>
          <p id="externalCreator" :title="`${'Submitted by '+video.submittedBy}`" v-if="video.submittedBy !== mainUser">{{ video.submittedBy }}</p>
          <p id="externalUpload" :title="`${'This video is uploaded on '+video.ytData.author+' channel.\n\nVideo availability is not guaranteed.'}`" v-if="video.ytData.authorId !== mainUserId">{{ video.ytData.author }}</p>
          <div class="video-item-data-secondary">
            <p id="category" v-if="video.submittedBy == mainUser">{{ video.type.name }}</p>
            <!-- <h3>{{ formatTimesAgo(video.created_at) }}</h3> -->
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: null,
      mainUser: 'darelisme Archives',
      mainUserId: 'UCDmHWpxQPteIISLRn_jbOQg',
    }
  },
  computed: {
    currentId() {
      return this.$route.query.v
    }
  },
  watch: {
    currentId() {
      this.fetchLibrary()
    }
  },
  mounted() {
    this.fetchLibrary()
  },
  methods: {
    async fetchLibrary() {
      const data  = await $fetch(`/dp/recommendations`, {
        baseURL: useRuntimeConfig().public.APIEndpoint,
      })
          if (data) {
            // console.log(data)
            this.videos = data
          } else {
            // console.log("Error fetching library recom data")
          }
    },
    convertSecondsToMMSS(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    },
    goVideo(id) {
      this.$router.push('/project/watch?v='+id)
    }
  }
}
</script>
<style scoped>
#externalUpload {
  padding: 2px 5px 2px 5px;
  margin-top: 5px;
  /* margin-left: -2px; */
  background-color: var(--color-background-mute);
  border-radius: 5px;
  font-size:0.7rem;
  width: fit-content;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Default to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
#externalCreator {
  font-size:0.7rem;
  /* padding: 5px;
  margin-top: 5px;
  margin-left: -5px;
  background-color: var(--color-background-mute);
  border-radius: 5px; */
}
#category {
  font-size: 0.7rem;
  /* padding: 2px 5px 2px 5px; */
  margin-top: 5px;
  /* margin-left: -2px; */
  /* border-radius: 5px; */
  /* background-color: var(--color-background-mute); */
  /* padding-right:5px; */
  width: max-content;
}
a {
  color:inherit;
}
a:hover {
  background-color:inherit;
}
@media (max-width: 1015px) {
  img {
    width: 128px;
  }
  .video-item {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 10px;
}
.video-item-data-2 h1 {
    font-size: 1rem;
  }
  .video-item-data-2 h3 {
    font-size: 0.7rem;
  }
  .lv-parent {
  padding: 3rem 0 3rem 0;
}
}
@media (min-width: 1015px) {
  img {
    /* width: 100%; */
    width: 160px;
  }
  .video-item {
  /* display: flex; */
  align-items: center;
  padding: 10px 10px 10px 10px;
}
.video-item-data-2 {
  width: 100%;
}
.video-item-data-2 h1 {
  font-size: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Default to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2em; /* Adjust line-height as needed */
}
  .video-item-data-2 h3 {
    font-size: 0.7rem;
  }
  .lv-parent {
  padding: 0 0 3rem 0;
  margin-top:-10px;
  margin-bottom: 20px;
}
}
@media (max-height: 20px) {
  .video-item-data-2 h1 {
    -webkit-line-clamp: 1; /* Limit to 1 line if height is constrained */
  }
}
h1 {
  font-weight: bolder;
}
img {
  border-radius: 7px;
}
.img-thumb {
  display: flex;
  align-items: flex-end;
  padding-right: 1.1rem;
}
.img-thumb p {
  font-size:0.75rem;
  margin-left: -43px;
  margin-bottom: 5px;
  border-radius:5px;
  background-color: var(--color-background);
  padding: 3px 5px 3px 5px;
  user-select: none;
}
.video-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 0 10px 0;
  max-height: 110px;
  overflow: hidden;
}
.video-item-data {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.video-item-data-secondary {
  /* display: flex; */
  /* align-items: center; */
}
</style>
