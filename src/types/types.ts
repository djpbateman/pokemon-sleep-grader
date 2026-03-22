import type {Ref, ComputedRef} from 'vue';
export type PokemonType = 'Berry' | 'Ingredient' | 'Skill';

export interface LevelScaling {
    slot: number;
    multiplier: number;
}

export interface ScoreMap {
    Berry: number;
    Ingredient: number;
    Skill: number;
}

export interface GameData {
    gradingConfig: {
        levelScaling: LevelScaling[];
        grades: string[];
        gradeThresholds: number[];
    };
    pokemonTypes: PokemonType[];
    natures: Record<string, ScoreMap>;
    subskillScores: Record<string, ScoreMap>;
}

export interface GraderInstance {
    data: GameData;
    selectedType: Ref<PokemonType | null>;
    selectedNature: Ref<string | null>;
    selectedSkills: Ref<(string | null)[]>;
    isComplete: ComputedRef<boolean>;
    stats: ComputedRef<{ mu: number; sigma: number } | null>;
    scoreParts: ComputedRef<{ nScore: number; subskillParts: number[]; total: number } | null>;
    currentScore: ComputedRef<number | null>;
    percentile: ComputedRef<number | null>;
    grade: ComputedRef<string>;
    gradeTheme: ComputedRef<string>;
    scoreDetail: ComputedRef<string>;
    showDebug: Ref<boolean>;
}
