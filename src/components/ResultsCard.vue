<script setup lang="ts">
import type {GraderInstance} from "../types/types.ts";
import DebugMaths from "./DebugMaths.vue";

const props = defineProps<{
  grader: GraderInstance
}>();

const {
  isComplete, currentScore, percentile, grade, gradeTheme, scoreDetail
} = props.grader;
</script>

<template>
  <div class="grid md:grid-cols-3 gap-4 text-center">
    <div class="p-4 rounded-lg border transition-colors duration-300" :class="gradeTheme">
      <div class="text-xs uppercase font-bold opacity-70">Score</div>
      <div class="text-2xl font-black">{{ currentScore ?? '?' }}</div>
    </div>

    <div class="p-4 rounded-lg border transition-colors duration-300" :class="gradeTheme">
      <div class="text-xs uppercase font-bold opacity-70">Grade</div>
      <div class="text-2xl font-black">{{ grade }}</div>
    </div>

    <div class="p-4 rounded-lg border transition-colors duration-300" :class="gradeTheme">
      <div class="text-xs uppercase font-bold opacity-70">Percentile</div>
      <div class="text-2xl font-black">
        {{ percentile !== null ? percentile + '/100' : '?' }}
      </div>
    </div>
  </div>

  <p v-if="!isComplete" class="text-center text-sm text-red-400 italic">
    Please select all fields to calculate grade.
  </p>

  <div v-if="isComplete" class="text-center text-sm text-gray-600 font-medium">
    {{ scoreDetail }}
  </div>

  <DebugMaths :grader="grader" />
</template>

<style scoped>

</style>
