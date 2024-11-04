<template>
    <div>
      <header v-if="!iPlayerMode" id="mainHeader">
        <NuxtLink to="/">
          <p>Home</p>
        </NuxtLink>
        <UCommandPalette
          :empty-state="null"
          :groups="searchRes"
          placeholder="Type to search..."
          @update:model-value="onSelect"
        />
      </header>
      <slot />  
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
  navigateTo({name: 'watch', query: {v: option.id}})
}
</script>
<style scoped>
#mainHeader {
  display: flex;
  align-items: center;
}
#mainHeader input {
  padding: 0 1rem 0 1rem;
}
</style>