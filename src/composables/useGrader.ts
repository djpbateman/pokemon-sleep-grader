import { ref, computed } from 'vue';
import type { GameData, PokemonType } from '../types/types';
import { calculatePopulationStats, erf } from "../utils/mathUtils";
import json from "../data/data.json";

const data = json as GameData;

type NatureKey = keyof typeof data.natures;
type SubskillKey = keyof typeof data.subskillScores;

export function useGrader() {
    const selectedType = ref<PokemonType | null>(null);
    const selectedNature = ref<NatureKey | null>(null);
    const selectedSkills = ref<(SubskillKey | null)[]>(Array(5).fill(null));

    const isComplete = computed(() =>
        !!selectedType.value &&
        !!selectedNature.value &&
        selectedSkills.value.every(Boolean)
    );

    const stats = computed(() => {
        if (!selectedType.value) return null;

        return calculatePopulationStats(
            selectedType.value as PokemonType,
            data.subskillScores,
            data.natures,
            data.gradingConfig.levelScaling.map(s => s.multiplier)
        );
    });

    const scoreParts = computed(() => {
        if (!isComplete.value || !selectedType.value || !selectedNature.value) return null;
        const currentType = selectedType.value;

        const nScore = data.natures[selectedNature.value][currentType];

        const subskillParts = selectedSkills.value.map((skillName, i) => {
            if (!skillName) return 0;
            const rawVal = data.subskillScores[skillName][currentType];
            const multiplier = data.gradingConfig.levelScaling[i].multiplier;
            return rawVal * multiplier;
        });

        const total = nScore + subskillParts.reduce((a, b) => a + b, 0);

        return {
            nScore,
            subskillParts,
            total
        };
    });

    const currentScore = computed(() => {
        if (!scoreParts.value) return null;
        return Number(scoreParts.value.total.toFixed(2));
    });

    const grading = computed(() => {
        if (!scoreParts.value || !stats.value) return null;

        const z = (scoreParts.value.total - stats.value.mu) / stats.value.sigma;

        const percentile = Math.min(
            Math.max(
                Math.round(0.5 * (1 + erf(z / Math.sqrt(2))) * 100),
                1
            ),
            100
        );

        const gradeIdx = data.gradingConfig.gradeThresholds.findIndex(t => percentile <= t);
        const grade = gradeIdx !== -1
            ? data.gradingConfig.grades[gradeIdx]
            : data.gradingConfig.grades[data.gradingConfig.grades.length - 1]; // Default to 'S'

        return { percentile, grade };
    });

    const percentile = computed(() => grading.value?.percentile ?? null);
    const grade = computed(() => grading.value?.grade ?? "?");

    const defaultTheme = 'bg-gray-100 text-gray-400 border-gray-200';
    const gradeThemes: Record<string, string> = {
        S: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        A: 'bg-green-100 text-green-800 border-green-300',
        B: 'bg-blue-100 text-blue-800 border-blue-300',
        C: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        D: 'bg-orange-100 text-orange-800 border-orange-300',
        F: 'bg-red-100 text-red-800 border-red-300',
    };

    const gradeTheme = computed(() => {
        if (!isComplete.value) return defaultTheme;
        return gradeThemes[grade.value] ?? defaultTheme;
    });

    const scoreDetail = computed(() => {
        if (!scoreParts.value) return "Score in detail: -";
        return `Score in detail: [Nature] ${scoreParts.value.nScore} + [Subskill] ${scoreParts.value.subskillParts.join(' + ')}`;
    });

    const showDebug = ref(false);

    return {
        data,
        selectedType,
        selectedNature,
        selectedSkills,
        isComplete,
        stats,
        scoreParts,
        currentScore,
        percentile,
        grade,
        gradeTheme,
        scoreDetail,
        showDebug,
    };
}
