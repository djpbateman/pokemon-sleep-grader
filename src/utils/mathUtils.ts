import type {PokemonType, ScoreMap} from '../types/types';

export function erf(x: number): number {
    const a = [0.254829592, -0.284496736, 1.421413741, -1.453152027, 1.061405429];
    const p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    const z = Math.abs(x);
    const t = 1.0 / (1.0 + p * z);
    const y = 1.0 - (((((a[4] * t + a[3]) * t + a[2]) * t + a[1]) * t + a[0]) * t * Math.exp(-z * z));
    return sign * y;
}

export function calculatePopulationStats(
    type: PokemonType,
    subskills: Record<string, ScoreMap>,
    natures: Record<string, ScoreMap>,
    scaling: number[]
) {
    const subVals = Object.values(subskills).map(s => s[type]);
    const natVals = Object.values(natures).map(n => n[type]);

    const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const variance = (arr: number[], m: number) =>
        arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length;

    const mSub = mean(subVals);
    const vSub = variance(subVals, mSub);
    const mNat = mean(natVals);
    const vNat = variance(natVals, mNat);

    const mu = mNat + (mSub * scaling.reduce((a, b) => a + b, 0));

    const sigma2 = vNat + scaling.reduce((acc, s) => acc + (vSub * (s ** 2)), 0);

    return {mu, sigma: Math.sqrt(sigma2)};
}
