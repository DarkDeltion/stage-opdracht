<script setup>
import { ref, onMounted, watch } from 'vue'
import Multiselect from 'vue-multiselect'
import { fetchByTags, fetchGames } from '../assets/api/FreeToGameApi'

const platforms = ['all', 'pc', 'browser']
const sorts = [
  { label: 'Release Date', value: 'release-date' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Alphabetical', value: 'alphabetical' },
  { label: 'Relevance', value: 'relevance' }
]
const tags = [
  'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'
]

const selectedTags = ref([])
const selectedPlatform = ref('all')
const selectedSort = ref('relevance')

const newReleases = ref([])
const loadingNew = ref(true)

async function fetchFilteredGames() {
  loadingNew.value = true

  // If tags are selected, use the filter endpoint
  if (selectedTags.value.length > 0) {
    newReleases.value = await fetchByTags({
      tags: selectedTags.value,
      platform: selectedPlatform.value,
      sort: selectedSort.value
    })
  } else {
    // Otherwise, use the general games endpoint
    const params = {}
    if (selectedPlatform.value !== 'all') params.platform = selectedPlatform.value
    if (selectedSort.value) params['sort-by'] = selectedSort.value
    newReleases.value = await fetchGames(params)
  }

  loadingNew.value = false
}

onMounted(fetchFilteredGames)
watch([selectedTags, selectedPlatform, selectedSort], fetchFilteredGames)
</script>

<template>
  <main>
    <div class="flex flex-col lg:flex-row w-full max-w-[90%] mx-auto mt-8 gap-8">
      <!-- Tag Section -->
      <section class="fixed top-[150px] left-5 w-full lg:w-1/5">
        <div class="bg-[#223355] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4">
          <h3 class="text-lg font-semibold text-gray-100 mb-4 text-center">Filter Games</h3>
          <div class="mb-4">
            <label class="block text-gray-200 mb-1">Platform</label>
            <select v-model="selectedPlatform" class="w-full h-[2.5rem] rounded p-1 bg-[#1D2D44] text-gray-100">
              <option v-for="platform in platforms" :key="platform" :value="platform">{{ platform }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 mb-1">Sort By</label>
            <select v-model="selectedSort" class="w-full h-[2.5rem] rounded p-1 bg-[#1D2D44] text-gray-100">
              <option v-for="sort in sorts" :key="sort.value" :value="sort.value">{{ sort.label }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 mb-1">Tags/Categories</label>
            <Multiselect
              v-model="selectedTags"
              :options="tags"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Pick tags"
              class="custom-multiselect"
              :show-labels="false"
            >
              <template #tag="{ option, remove }">
                <span
                  class="inline-flex items-center bg-blue-700 text-white text-xs px-2 py-1 rounded-full mr-1 mb-1 cursor-pointer hover:bg-blue-500 transition"
                  @click="remove(option)"
                >
                  {{ option }}
                  <span class="ml-1 text-white font-bold">&times;</span>
                </span>
              </template>
            </Multiselect>
          </div>
        </div>
      </section>

      <!-- Games Section -->
      <section class="w-full lg:w-4/5 ml-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <!-- Skeleton loader voor nieuwe releases -->
          <div v-if="loadingNew" v-for="n in 5" :key="n" class="w-full">
            <div class="flex flex-col items-center animate-pulse bg-[#223355] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4 min-h-[320px] max-h-[340px] overflow-hidden">
              <div class="w-full h-28 mb-4 bg-gray-200 rounded-md"></div>
              <div class="flex flex-col flex-1 w-full space-y-2">
                <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="mt-auto text-center space-y-1">
                  <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Nieuwe releases kaarten -->
          <router-link
            v-else
            v-for="game in newReleases"
            :key="game.id"
            :to="{ name: 'Fullpage', params: { gameTitle: game.title, id: game.id } }"
            class="no-underline"
          >
            <article
              class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4 min-h-[320px] max-h-[340px] overflow-hidden transition-transform duration-200 hover:scale-105"
            >
              <div class="w-full h-28 mb-4">
                <img
                  :src="game.thumbnail"
                  :alt="game.title"
                  class="w-full h-full object-cover rounded-md shadow"
                />
              </div>
              <div class="flex flex-col flex-1 w-full">
                <h2 class="text-lg font-semibold text-center text-gray-100 mb-2">{{ game.title }}</h2>
                <p class="text-xs text-gray-200 text-center mb-3 line-clamp-4">{{ game.short_description }}</p>
                <div class="mt-auto text-center">
                  <p class="text-xs text-blue-300 mb-1">Genre: {{ game.genre }}</p>
                  <p class="text-xs text-blue-300">Platform: {{ game.platform }}</p>
                </div>
              </div>
            </article>
          </router-link>
        </div>
      </section>
    </div>
  </main>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
/* Main multiselect container */
.custom-multiselect .multiselect {
  background: #1D2D44;
  color: #f1f1f1;
  border: 1px solid #3E5C76;
  border-radius: 0.375rem;
}

/* The area where selected tags and input appear */
.custom-multiselect .multiselect__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  min-height: 2.5rem;
  background: #1D2D44;
  color: #f1f1f1;
  border-radius: 0.375rem;
  border: 1px solid #3E5C76;
  padding: 0.25rem 0.5rem;
  width: 100%; /* Ensure full width */
}

/* Placeholder text aligned left and vertically centered */
.custom-multiselect .multiselect__placeholder {
  color: #b0b8c1;
  background: #1D2D44;
  margin-left: 0;
  text-align: left;
  align-self: center;
  width: 100%;
}

/* Input field for searching/adding tags */
.custom-multiselect .multiselect__input,
.custom-multiselect .multiselect__single {
  background: #1D2D44;
  color: #f1f1f1;
}

/* Dropdown options container */
.custom-multiselect .multiselect__content {
  background: #223355;
}

/* Each option in the dropdown */
.custom-multiselect .multiselect__option {
  color: #f1f1f1;
}

/* Highlighted option */
.custom-multiselect .multiselect__option--highlight {
  background: #3E5C76;
  color: #fff;
}

/* Tag (chip) styling - allow wrapping and better spacing */
.custom-multiselect .multiselect__tag {
  display: inline-flex; /* Make tags inline */
  align-items: center;
  background: #2563eb;
  color: #fff;
  border-radius: 9999px;
  padding: 0.15rem 0.75rem;
  margin: 0;
  font-size: 0.85em;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* Tag remove (x) button */
.custom-multiselect .multiselect__tag-icon {
  color: #fff;
  margin-left: 0.5em;
  cursor: pointer;
  transition: color 0.2s;
}
.custom-multiselect .multiselect__tag-icon:hover {
  color: #ff6b6b;
}

/* Dropdown arrow */
.custom-multiselect .multiselect__select {
  color: #b0b8c1;
}

/* Remove border on focus */
.custom-multiselect .multiselect:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #2563eb33;
}
</style>