<script setup lang="ts">
import { useGrader } from '../composables/useGrader';
import PokemonForm from "./PokemonForm.vue";
import ResultsCard from "./ResultsCard.vue";

const grader = useGrader();
</script>

<template>
  <div class="flex flex-col gap-4">
    <PokemonForm :grader="grader" />
    <ResultsCard :grader="grader" />
  </div>
</template>
