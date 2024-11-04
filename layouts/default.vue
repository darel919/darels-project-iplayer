<template>
    <div>
      <header v-if="!iPlayerMode" id="mainHeader" class="pl-6 pr-6">
        <NuxtLink to="/">
          <p>Home</p>
        </NuxtLink>
        <UCommandPalette
          autoselect="false"
          :empty-state="null"
          class="searchContainer"
          :groups="searchRes"
          placeholder="Type to search..."
          @update:model-value="onSelect"
        />
      </header>
      <slot/>  
      <!-- <footer>
        <p>darel's Project powered by Nuxt</p>
      </footer> -->
    </div>
  </template>
<script setup>
const route = useRoute()
const iPlayerMode = computed(() => {
  if(route.path === '/iplayer') {
    return true
  } else {
    return false
  }
})

const searchRes = [{
  label: q => q && `Videos matching “${q}”...`,
  search: async (q) => {
    if (!q) {
      return []
    }
    const res = await $fetch('/dp/search', {
      baseURL: useRuntimeConfig().public.APIEndpoint,
      params: { q } 
    })
    return res.data.map(item => ({ id: item.content_id, label: item.ytData.title }))
  }
}]
function onSelect(option) {
  // console.log(option)
  navigateTo({name: 'watch', query: {v: option.id}})
}
</script>
<style scoped>
#mainHeader {
  display: flex;
  align-items: center;
  height: 82px;
}
#mainHeader input {
  padding: 0 1rem 0 1rem;
}
#mainHeader {
  position: fixed;
  z-index: 10;
  left:0;
  right:0;
  top:0;
}


.searchContainer {
  left: 0;
    position: absolute;
    background: black;
    width: -webkit-fill-available;
    margin-top: 1rem;
    top: 0;
    margin-left: 96px;
}

</style>