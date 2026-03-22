<script setup lang="ts">
import type {GraderInstance} from "../types/types.ts";

const props = defineProps<{
  grader: GraderInstance
}>();

const {
  isComplete, currentScore, stats,
  scoreParts, showDebug
} = props.grader;
</script>

<template>
  <button v-if="isComplete"
          @click="showDebug = !showDebug"
          class="text-xs font-mono text-gray-400 hover:text-blue-700 transition-colors cursor-pointer"
  >
    {{ showDebug ? '[ Hide Detailed Maths ]' : '[ Show Detailed Maths ]' }}
  </button>

  <div v-if="showDebug && stats" class="p-4 bg-slate-900 rounded-lg font-mono text-xs text-green-400 shadow-inner">
    <div class="grid grid-cols-2 gap-2">
      <div class="border-r border-slate-700 pr-2 text-left">
        <p class="text-slate-500 uppercase mb-1">Population Stats</p>
        <p>Mean (μ): {{ stats.mu.toFixed(4) }}</p>
        <p>Std Dev (σ): {{ stats.sigma.toFixed(4) }}</p>
      </div>
      <div class="pl-2 text-left">
        <p class="text-slate-500 uppercase mb-1">Current Calculation</p>
        <p>Score: {{ currentScore }}</p>
        <p v-if="isComplete && scoreParts">
          Z-Score: {{ ((scoreParts.total - stats.mu) / stats.sigma).toFixed(4) }}
        </p>
      </div>
    </div>
    <div class="mt-3 pt-3 border-t border-slate-700 text-[10px] text-slate-500 italic">
      * Formula: Z = (Score - μ) / σ
    </div>
  </div>
</template>

<style scoped>

</style>
