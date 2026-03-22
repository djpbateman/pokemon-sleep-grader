<script setup lang="ts">
import type { GraderInstance } from "../types/types.ts";

const props = defineProps<{
  grader: GraderInstance
}>();

const { data, selectedType, selectedNature, selectedSkills } = props.grader;
</script>

<template>
  <div class="flex flex-col gap-4 bg-white border border-gray-200 rounded p-4">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-col w-full">
        <label class="text-md font-semibold mb-2">Pokémon Type</label>
        <select v-model="selectedType" class="border border-gray-200 rounded p-2 w-full bg-white cursor-pointer">
          <option :value="null" disabled>-- Select Specialty --</option>
          <option v-for="type in data.pokemonTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>

      <div class="flex flex-col w-full">
        <label class="text-md font-semibold mb-2">Nature</label>
        <select v-model="selectedNature" class="border border-gray-200 rounded p-2 bg-white cursor-pointer">
          <option :value="null" disabled>-- Select Nature --</option>
          <option v-for="name in Object.keys(data.natures).sort()" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex flex-col gap-4 border border-gray-100 bg-gray-50/50 rounded p-4">
      <span class="text-md font-semibold text-gray-700">Subskills</span>

      <div
          v-for="(level, i) in [10, 25, 50, 75, 100]"
          :key="level"
          class="flex items-center gap-2 md:gap-4">
        <label class="min-w-12 text-xs text-gray-500 font-bold uppercase">Lv.{{ level }}</label>

        <select
            v-model="selectedSkills[i]"
            class="flex-1 border border-gray-200 rounded p-2 w-full bg-white cursor-pointer text-sm">
          <option :value="null" disabled>-- Select Subskill --</option>
          <option
              v-for="name in Object.keys(data.subskillScores).sort()"
              :key="name"
              :value="name">
            {{ name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
