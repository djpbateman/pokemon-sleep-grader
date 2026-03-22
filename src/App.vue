<script setup lang="ts">
import {ref} from "vue";
import GraderBlock from "./components/GraderBlock.vue";

const isComparisonMode = ref(false);
const toggleMode = () => {
  isComparisonMode.value = !isComparisonMode.value;
};
</script>

<template>
  <div class="container mx-auto font-sans p-6" :class="isComparisonMode ? 'max-w-6xl' : 'max-w-2xl'">

    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-semibold">
        Pokémon Sleep {{ isComparisonMode ? 'Comparison' : '' }} Grader
      </h1>

      <button
          @click="toggleMode"
          class="bg-blue-700 text-white rounded-md hover:bg-blue-800 cursor-pointer transition-colors text-sm px-4 py-2 ">
        {{ isComparisonMode ? 'Switch to Single View' : 'Switch to Comparison View' }}
      </button>
    </div>

    <div :class="isComparisonMode ? 'grid md:grid-cols-2 gap-8' : 'flex flex-col'">
      <GraderBlock/>
      <GraderBlock v-if="isComparisonMode"/>
    </div>

    <p class="text-xs text-center text-gray-600 italic py-6">Notes: Each subskill order has multiplier 1.5,1.25,1,0.75,0.5.</p>

  </div>
</template>
